const axios = require('axios');

class WeatherService {
  async getForecast(city) {
    return {
      forecast: "Sunny with occasional clouds",
      temp: "24°C",
      humidity: "45%"
    };
  }
}

module.exports = new WeatherService();
