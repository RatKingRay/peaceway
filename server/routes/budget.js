const express = require('express');
const Budget = require('../models/budget');
const router = express.Router();

router
  .get('/', (req, res) => {
    try {
      const budget = Budget.getBudget();
      res.send(budget);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/update', (req, res) => {
    try {
    const exercise = Budget.update(req.body);
    res.send({...budget, content: undefined})
    } catch(error) {
    res.status(401).send({message: error.message});
    }
})

module.exports = router;

