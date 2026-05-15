const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  origin: { type: String, default: '' },
  destination: { type: String, required: true },
  days: { type: Number, required: true },
  budget: { type: String, required: true },
  travelType: { type: String, required: true },
  interests: [{ type: String }],
  generatedPlan: { type: mongoose.Schema.Types.Mixed, default: [] },
  flightDetails: { type: mongoose.Schema.Types.Mixed, default: null },
  liveData: {
    weather: { type: mongoose.Schema.Types.Mixed, default: null },
    hotels: { type: mongoose.Schema.Types.Mixed, default: [] }
  }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
