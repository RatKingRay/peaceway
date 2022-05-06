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

  .post('/update', async (req, res) => {
    try {
    const budget = await Budget.update(req.body.weeklyLimit, req.body.userId);
    res.send({...budget, content: undefined})
    } catch(error) {
    res.status(401).send({message: error.message});
    }
  })

  .post('/display', async (req, res) => {
    try {
      const budget = await Budget.display(req.body.userId);
      res.send({ weeklyLimit: budget }) //Can only send object, so I'm sending a number as an object
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  .post('/createEntry', async (req, res) => {
    try {
      const budget = await Budget.createEntry(req.body.userId);
      res.send({...budget, content: undefined})
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  .post('/add', async (req, res) => {
    try {
      console.log(`In add ${req.body.userId}`)
      console.log(`In add ${req.body.weeklyCurrent}`)
      //All good^
      //NOT GOOD NOT GOOD^
      const budget = await Budget.add(req.body.weeklyCurrent, req.body.userId);
      res.send(budget)
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  .post('/reset', async (req, res) => {
    try {
      await Budget.clear( req.body.userId);
      res.send({success: "Cya budget!"});
    } catch(error) {
      res.status(401).send({message: error.message});
    }
  })

  // .delete('/clear', async (req, res) => {
  //   try {
  //     console.log(req.body)
  //     await Budget.clear(req.body.budgetId);
  //     res.send({success: "Cya budget!"});
  //   } catch(error) {
  //     res.status(401).send({message: error.message});
  //   }
  // })

module.exports = router;

