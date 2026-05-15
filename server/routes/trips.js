const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');
const osmService = require('../services/osmService');
const weatherService = require('../services/weatherService');
const aiService = require('../services/aiService');

// Get all trips for user
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single trip
router.get('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a trip
router.delete('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create and generate a new trip plan
router.post('/generate', auth, async (req, res) => {
  try {
    const { origin, destination, budget, travelType, interests, days } = req.body;
    
    // Fetch live data via services
    const coords = await osmService.fetchCoordinates(destination);
    
    let weather = null;
    let placesData = { attractions: [], hotels: [] };
    
    if (coords) {
      weather = await weatherService.getForecast(destination);
      const attractions = await osmService.fetchAttractions(coords.lat, coords.lng);
      const hotels = await osmService.fetchHotels(coords.lat, coords.lng);
      placesData = { attractions, hotels };
    }

    let generatedPlan = [];
    
    // Attempt AI Generation
    try {
       generatedPlan = await aiService.generateItinerary({
         origin, destination, days, budget, travelType, interests, weather, placesData
       });
    } catch(err) {
       console.error("AI Gen Failed. Falling back to heuristic real-data mock.", err.message);
       // Mock fallback
       const fallbackPlan = [];
       for(let i=0; i<days; i++) {
          fallbackPlan.push({
            day: i+1,
            title: `Exploring ${destination}`,
            type: "standard",
            activities: ["Sightseeing", "Local Food"],
            locations: placesData.attractions ? placesData.attractions.slice(0,3).map(a => a.name) : [],
            foodPlaces: ["Local Cafe", "Downtown Restaurant"]
          });
       }
       generatedPlan = fallbackPlan;
    }

    // Save
    const trip = new Trip({
      userId: req.user.id,
      origin, destination, budget, travelType, interests, days,
      generatedPlan,
      flightDetails: travelType === 'Flight' ? {
        airline: "Generic Airlines",
        flightNumber: "GA-123",
        departureTime: "08:00 AM",
        arrivalTime: "11:30 AM",
        duration: "3h 30m",
        price: 5000
      } : null,
      liveData: { weather, hotels: placesData.hotels }
    });

    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate plan' });
  }
});

module.exports = router;
