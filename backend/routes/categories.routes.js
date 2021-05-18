const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');

router.get('/category', async (req, res) => {
  try {
    const result = await Category.find();
    if(!result) res.status(404).json({ category: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/category/:id', async (req, res) => {
  try {
    const result = await Category.findById(req.params.id);
    if(!result) res.status(404).json({ category: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
