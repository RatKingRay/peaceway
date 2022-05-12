const con = require("./db_connect")
const date = require('date-and-time')

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS notes (
    noteId INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    content VARCHAR(255),
    is_vent BOOLEAN,
    date DATETIME,
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
  const now = new Date()
  console.log(`Current time is: ${date.format(now, 'YYYY-MM-DD HH:mm:ss')}`)

  let data = await con.query(sql)
  data.forEach(note => {
    if(note.is_vent === 1) {
      let noteDate = new Date(note.date)
      console.log(`Note ${note.noteId} was created at ${date.format(noteDate, 'YYYY-MM-DD HH:mm:ss')}`)
  
      let dateSubtraction = date.subtract(now, noteDate).toMinutes();
      if(dateSubtraction >= 1) {
        deleteNote(note.noteId)
        console.log("successfully deleted")
      }
    }
  })

  return await con.query(sql)
}

async function create(note) {
  // const sql = `DROP TABLE notes`
  let now = new Date();
  now = date.format(now, 'YYYY-MM-DD HH:mm:ss');

  const sql = `INSERT INTO notes (userId, content, is_vent, date)
  VALUES ( ${note.userId}, '${note.content}', '${note.is_vent}', '${now}' )
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