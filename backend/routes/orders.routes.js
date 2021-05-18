const express = require('express');
const router = express.Router();
const Order = require('../models/order.models');

router.get('/cart', async (req, res) => {
  try {
    const result = await Order
      .find()
      .select('dataOrder statusSubmited firstName')
      .sort({ dataOrder: -1});
    if(!result) res.status(404).json({ apartment: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/cart/:id', async (req, res) => {
  try {
    const result = await Order.findById(req.params.id);
    if(!result) res.status(404).json({ order: 'Not found'});
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/cart', async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { firstName, surname, email, phone, statusSubmited, idSubmited, dataSubmited } = req.body.dataSubmit;

    // var environment = process.env.NODE_ENV;
    // console.log('environment:', environment);
    // var isDevelopment = environment === 'development';
    // console.log('isDevelopment:', isDevelopment);
    // if(isDevelopment) {
    //   console.log('wersja developerska');
    // } else {
    //   console.log('wersja produkcyjna');
    // }

    const emailPattern = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+\.{1,3}[a-zA-Z]{2,4}');
    const phonePattern = new RegExp('[0-9]{6,13}');
    const emailMatched = (email.match(emailPattern) || []).join('');
    const phoneMatched = (phone.match(phonePattern) || []).join('');

    if((emailMatched.length < email.length) || (phoneMatched.length < phone.length)) {
      throw new Error('Wrong characters used!');
    }

    if((emailMatched.length == email.length) && (phoneMatched.length == phone.length) && firstName.length >=2 && surname.length >=2) {
      const newOrder = new Order({
        apartments: req.body.apartments,
        firstName, surname, email, phone, statusSubmited, idSubmited, dataSubmited,
      });

      await newOrder.save();
      console.log('newOrder', newOrder);
      res.json(newOrder);
    } else {
      throw new Error('Wrong input!');
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;
