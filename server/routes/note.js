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

    .post('/create', (req, res) => {
        try {
        const note = Note.create(req.body);
        // res.send({...note})
        } catch(error) {
        res.status(401).send({message: error.message});
        }
    })

    // .get('/update', (req, res) => {
    //     try {
    //     const notes = Note.getNotes();
    //     res.send(notes);
    //     } catch(err) {
    //     res.status(401).send({message: err.message});
    //     }
    // })

    .delete('/delete_note', (req, res) => {
        try {
          Note.deleteNote(req.body.noteId);
          res.send({success: "Cya note!"});
        } catch(error) {
          res.status(401).send({message: error.message});
        }
      })

module.exports = router;