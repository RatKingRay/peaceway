const con = require("./db_connect")

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS exercises (
    exerciseId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    instructions VARCHAR(999),
    exerciseMood VARCHAR(50),
    CONSTRAINT excercieUserFk FOREIGN KEY(userId) REFERENCES users(userId)
  )`
  await con.query(sql)
}
createTable()

let getExercise = () => excercise

async function createEntries(userId) {
  // const sql = `DROP TABLE exercises`

  // const sql = `DELETE FROM exercises
  // WHERE userId = ${userId}
  // AND exerciseMood = 'sad'
  // `

  //IGNORE because we need to intially create base exercises for each user, but they might already exist

  const sqlSad = `INSERT IGNORE INTO exercises (userId, instructions, exerciseMood)
  VALUES ('${userId}', 'sample', 'sad')
  `
  const sqlHap = `INSERT IGNORE INTO exercises (userId, instructions, exerciseMood)
  VALUES ('${userId}', 'sample', 'happy')
  `
  const sqlAng = `INSERT IGNORE INTO exercises (userId, instructions, exerciseMood)
  VALUES ('${userId}', 'sample', 'angry')
  `
  const sqlBor = `INSERT IGNORE INTO exercises (userId, instructions, exerciseMood)
  VALUES ('${userId}', 'sample', 'bored')
  `
  const sqlAnx = `INSERT IGNORE INTO exercises (userId, instructions, exerciseMood)
  VALUES ('${userId}', 'sample', 'anxious')
  `

  await con.query(sqlSad)
  await con.query(sqlHap)
  await con.query(sqlAng)
  await con.query(sqlBor)
  await con.query(sqlAnx)
}

async function setInstructions(instructions, userId) {
  //Gonna have to concatenate strings with previous instructions and add in that <li> stuff
  const sql = `UPDATE exercises SET
  weeklyLimit = ${instructions}
  WHERE userId = ${userId}
  AND exerciseMood = 'sad'
  `

  return await con.query(sql)
}

// const exercises = [
//     {
//       exerciseId: 24,
//       instructions: [
//           "Do some painting",
//           "Finish reading 'The Hobbit'"
//         ],
//       exercise_mood: "happy",
//       is_active: "true"
//     },
// ]

//Staple onto list w/ added html like <li> and stuff

// let getExercises = async () => {
//   const sql = "SELECT * FROM notes"
//   return await con.query(sql)   //Have to use await and async because query is async
// }

function create(exercise) {

  
}

module.exports = { getExercise, setInstructions, createEntries }