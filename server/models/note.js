const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS notes (
    noteId INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    content VARCHAR(255),
    is_vent BOOLEAN,
    date DATE,
    CONSTRAINT note_pk PRIMARY KEY(noteId)
  )`
  await con.query(sql)
}
createTable()

let getNotes = async () => {
  const sql = "SELECT * FROM notes"
  return await con.query(sql)
}

async function displayNotes(userId) {
  const sql = `SELECT * FROM notes
  WHERE userId = ${userId}
  `
  return await con.query(sql)
}

async function create(note) {
  const sql = `INSERT INTO notes (userId, content, is_vent)
  VALUES ( ${note.userId}, '${note.content}', '${note.is_vent}' )
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

module.exports = { displayNotes, create, getNotes, deleteNote }