const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: 'What would you like to know?' });

    // Dummy logic if no AI API is set
    res.json({ reply: "I am your AI Travel Assistant. How can I help you plan your perfect trip?" });
  } catch (err) {
    res.status(500).json({ reply: 'Sorry, I am having trouble connecting to the AI brain.' });
  }
});

module.exports = router;
