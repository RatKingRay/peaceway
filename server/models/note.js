const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS notes (
    noteId INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(255),
    emotion VARCHAR(50),
    is_vent BOOLEAN,
    date DATE,
    CONSTRAINT note_pk PRIMARY KEY(noteId)
  )`
  await con.query(sql)
}
createTable()

let getNotes = async () => {
  const sql = "SELECT * FROM notes"
  return await con.query(sql)   //Have to use await and async because query is async?
}

async function displayNotes() {
  const sql = "SELECT * FROM notes"
  return await con.query(sql)
}

async function create(note) {
  const sql = `INSERT INTO notes (content, emotion, is_vent)
  VALUES ( "${note.content}", "${note.emotion}", "${note.is_vent}" )
  `

  const insert = await con.query(sql)
  return insert
}

async function deleteNote(noteId) {
  const sql = `DELETE FROM notes
  WHERE noteId = ${noteId}
  `
  const insert = await con.query(sql)
}

function noteExists(noteIdTemp) {
  return users.filter((u) => u.noteId === noteIdTemp)
}

module.exports = { displayNotes, create, getNotes, deleteNote }