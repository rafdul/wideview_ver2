const express = require('express');
const router = express.Router();
const path = require('path');
const Apartment = require('../models/apartment.model');

router.get('/apartments', async (req, res) => {
  try {
    const result = await Apartment.find();
    // console.log(req);
    if(!result) res.status(404).json({ apartment: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/apartments/:id', async (req, res) => {
  try {
    const result = await Apartment.findById(req.params.id);
    // console.log(req);
    if(!result) res.status(404).json({ apartment: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/apartments/category/:category', async (req, res) => {
  try {
    const result = await Apartment.find({category: req.params.category});
    console.log('req w get category', req.params);
    if(!result) res.status(404).json({ apartment: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/apartments/category/:category/:id', async (req, res) => {
  try {
    const result = await Apartment.find({category: req.params.category});
    const newResult = await Apartment.findById(req.params.id);
    console.log('req w get category', req.params);
    if(!result) res.status(404).json({ apartment: 'Not found'});
    else res.json(newResult);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
