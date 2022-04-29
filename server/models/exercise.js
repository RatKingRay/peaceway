const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_fname VARCHAR(50),
    user_password VARCHAR(50),
    CONSTRAINT user_pk PRIMARY KEY(user_id)
  )`
  await con.query(sql)
}
createTable()

const exercises = [
    {
      exerciseId: 24,
      instructions: [
          "Do some painting",
          "Finish reading 'The Hobbit'"
        ],
      excercise_mood: "happy",
      is_active: "true"
    },
    {
      exerciseId: 25,
      instructions: [
        "Bake something fun",
        "Call friends"
        ],
      excercise_mood: "sad",
      is_active: "false"
    },
    {
      exerciseId: 26,
      instructions: [
        "Take a break",
        "Make an espresso"
        ],
      excercise_mood: "tired",
      is_active: "false"
    }
]

let getExercises = async () => {
  const sql = "SELECT * FROM notes"
  return await con.query(sql)   //Have to use await and async because query is async
}

function create(excercise) {
  // const n = noteExists(note.noteId);
  // if(n.length>0) throw Error('Note already exists')
  
  const newExcercise = {
    exerciseId: exercises[exercises.length-1].exerciseId + 1,
    instructions: exercise.instructions,
    excercise_mood: exercise.excercise_mood,
    is_active: exercise.is_active
  }
  
  exercises.push(newExcercise)   //to put onto stack of user objects
  return newExcercise
}