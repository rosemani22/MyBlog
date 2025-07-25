const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');

router.get('/stats', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const blogCount = await Blog.countDocuments();
    
    res.json({
      userCount,
      blogCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;