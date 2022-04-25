const express = require('express');
const Exercise = require('../models/exercise');
const router = express.Router();

router
  .get('/', (req, res) => {
    try {
      const exercises = Exercise.getExercises();
      res.send(exercises);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/create', (req, res) => {
    try {
    const exercise = Exercise.create(req.body);
    res.send({...exercise, content: undefined})
    } catch(error) {
    res.status(401).send({message: error.message});
    }
})

module.exports = router;

