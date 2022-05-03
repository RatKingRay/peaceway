const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
    .get('/', (req, res) => {
        try {
        const notes = Note.getNotes();
        res.send(notes);
        } catch(err) {
        res.status(401).send({message: err.message});
        }
    })

    .post('/display', async (req, res) => {
        try {
        const notes = await Note.displayNotes(req.body)
        //const notes = await Note.displayNotes();
        res.send(notes);
        } catch(err) {
          res.status(401).send({message: err.message});
        }
    })

    .post('/create', async (req, res) => {
        try {
        const note = await Note.create(req.body);
        res.send({...note, content: undefined})
        } catch(error) {
        res.status(401).send({message: error.message});
        }
    })

    .delete('/delete', async (req, res) => {
        try {
          console.log(req.body)
          Note.deleteNote(req.body.noteId);
          res.send({success: "Cya note!"});
        } catch(error) {
          res.status(401).send({message: error.message});
        }
      })

module.exports = router;