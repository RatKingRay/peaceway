const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS notes (
    noteId INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(255),
    emotion VARCHAR(50),
    is_vent BOOLEAN,
    CONSTRAINT note_pk PRIMARY KEY(noteId)
  )`
  await con.query(sql)
}
createTable()

// const notes = [
//     {
//       noteId: 12345,
//       content: "hello",
//     },
//     {
//       noteId: 55555,
//       content: "Get assigment done",
//     },
//     {
//       noteId: 34212,
//       content: "Bake pie",
//     }
// ]

let getNotes = async () => {
  const sql = "SELECT * FROM notes"
  return await con.query(sql)   //Have to use await and async because query is async
}

function displayNotes() {
  let notes = getNotes()
  return notes
}

function create(note) {
  // const n = noteExists(note.noteId);
  // if(n.length>0) throw Error('Note already exists')
  
  const newNote = {
    noteId: notes[notes.length-1].noteId + 1,
    content: note.content,
    mood: note.mood,
    is_vent: note.is_vent
  }
  
  notes.push(newNote)   //to put onto stack of user objects
  return newNote
}

function deleteNote(noteId) {
  let i = notes.map((note) => note.noteId).indexOf(noteId);
  notes.splice(i, 1);
  console.log(notes)
}

function noteExists(noteIdTemp) {
  return users.filter((u) => u.noteId === noteIdTemp)
}

module.exports = { create, getNotes, deleteNote }