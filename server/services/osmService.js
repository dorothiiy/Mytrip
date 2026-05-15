const axios = require('axios');

const osmCache = new Map();

class OSMService {
  async fetchCoordinates(city) {
    if (!city) return null;
    const cacheKey = `coords_${city}`;
    if (osmCache.has(cacheKey)) return osmCache.get(cacheKey);

    try {
      const response = await axios.get('https://photon.komoot.io/api/', {
        params: { q: city, limit: 1 }
      });
      if (response.data && response.data.features && response.data.features.length > 0) {
        const coordsRaw = response.data.features[0].geometry.coordinates; // [lon, lat]
        const coords = {
          lat: parseFloat(coordsRaw[1]),
          lng: parseFloat(coordsRaw[0])
        };
        osmCache.set(cacheKey, coords);
        return coords;
      }
      return null;
    } catch (err) {
      console.error('Photon Geocode error:', err.message);
      return null;
    }
  }

  async fetchAttractions(lat, lng) {
    if (!lat || !lng) return [];
    const cacheKey = `attr_${lat}_${lng}`;
    if (osmCache.has(cacheKey)) return osmCache.get(cacheKey);

    try {
      const radius = 5000;
      const overpassQuery = `
        [out:json][timeout:5];
        (
          node(around:${radius},${lat},${lng})["tourism"="attraction"];
          node(around:${radius},${lat},${lng})["tourism"="museum"];
          node(around:${radius},${lat},${lng})["historic"];
        );
        out 10;
      `;
      const response = await axios.post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(overpassQuery)}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 8000
      });

      const elements = response.data.elements || [];
      const results = elements.map(e => ({
        name: e.tags.name,
        lat: e.lat,
        lng: e.lon,
        type: e.tags.tourism || e.tags.historic
      })).filter(e => e.name);
      
      osmCache.set(cacheKey, results);
      return results;
    } catch (err) {
      console.error('Overpass Attractions error:', err.message);
      return [];
    }
  }

  async fetchHotels(lat, lng) {
    if (!lat || !lng) return [];
    try {
      const radius = 5000;
      const overpassQuery = `
        [out:json][timeout:5];
        node(around:${radius},${lat},${lng})["tourism"="hotel"];
        out 10;
      `;
      const response = await axios.post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(overpassQuery)}`, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 8000
      });

      const elements = response.data.elements || [];
      const results = elements.map(e => ({
        name: e.tags.name,
        lat: e.lat,
        lng: e.lon,
        rating: 4.0, // fallback
        price_level: 2 // fallback
      })).filter(e => e.name);
      
      return results;
    } catch (err) {
      console.error('Overpass Hotels error:', err.message);
      return [];
    }
  }
}

module.exports = new OSMService();
