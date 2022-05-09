const con = require("./db_connect")

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS exercises (
    userId INT NOT NULL,
    instructions VARCHAR(999),
    exerciseMood VARCHAR(50),
    CONSTRAINT excercieUserFk FOREIGN KEY(userId) REFERENCES users(userId)
  )`
  //  CONSTRAINT excercieUserPk PRIMARY KEY(userId),
  //    exerciseId INT NOT NULL AUTO_INCRETMENT PRIMARY KEY,
  await con.query(sql)
}
createTable()

let getExercise = () => excercise

async function createEntries(userId) {
  // const sqlSad = `DROP TABLE exercises`
  // await con.query(sql)

  // const sql = `DELETE FROM exercises
  // WHERE userId = ${userId}
  // AND exerciseMood = 'sad'
  // `

  //IGNORE because we need to intially create base exercises for each user, but they might already exist



  // const sqlSad = `IF EXISTS (SELECT * FROM exercises WHERE exerciseMood = 'sad')
  //   INSERT INTO exercises (userId, instructions, exerciseMood)
  //   VALUES ('${userId}', 'sample', 'sad')
  // ELSE
  //   INSERT INTO exercises (userId, instructions, exerciseMood)
  //   VALUES ('${userId}', 'sample', 'sad')
  // `

  // const sqlSad = `INSERT INTO exercises (userId, instructions, exerciseMood)
  // VALUES ('${userId}', 'sample', 'sad')
  // WHERE NOT EXISTS (
  //   SELECT exerciseMood FROM exercises WHERE exerciseMood = 'sad'
  // )
  // `


  const sqlSad = `INSERT INTO exercises (userId, instructions, exerciseMood) 
    SELECT '${userId}', 'sample', 'sad'
    WHERE NOT EXISTS 
      (SELECT exerciseMood 
       FROM exercises 
       WHERE exerciseMood = 'sad')
  `
  const sqlHap = `INSERT INTO exercises (userId, instructions, exerciseMood) 
  SELECT '${userId}', 'sample', 'happy'
  WHERE NOT EXISTS 
    (SELECT exerciseMood 
     FROM exercises 
     WHERE exerciseMood = 'happy')
  `
  const sqlAng = `INSERT INTO exercises (userId, instructions, exerciseMood) 
  SELECT '${userId}', 'sample', 'angry'
  WHERE NOT EXISTS 
    (SELECT exerciseMood 
     FROM exercises 
     WHERE exerciseMood = 'angry')
  `
  const sqlBor = `INSERT INTO exercises (userId, instructions, exerciseMood) 
  SELECT '${userId}', 'sample', 'bored'
  WHERE NOT EXISTS 
    (SELECT exerciseMood 
     FROM exercises 
     WHERE exerciseMood = 'bored')
  `
  const sqlAnx = `INSERT INTO exercises (userId, instructions, exerciseMood) 
  SELECT '${userId}', 'sample', 'anxious'
  WHERE NOT EXISTS 
    (SELECT exerciseMood 
     FROM exercises 
     WHERE exerciseMood = 'anxious')
  `

  await con.query(sqlSad)
  await con.query(sqlHap)
  await con.query(sqlAng)
  await con.query(sqlBor)
  await con.query(sqlAnx)
}

async function setInstructions(instructionMood, instructions, userId) {
  //Gonna have to concatenate strings with previous instructions and add in that <li> stuff

  // const sql2 = `SELECT instructions FROM exercises
  // WHERE userId = ${userId}
  // AND exerciseMood = '${instructionMood}'
  // `
  // const insert = await con.query(sql2)
  // let prevInstru = insert[0].instructions
  // console.log(prevInstru)
  // prevInstru.concat(instructions)



  const sql = `UPDATE exercises SET
  instructions = '${instructions}'
  WHERE userId = ${userId}
  AND exerciseMood = '${instructionMood}'
  `
  //Add <br> and previous instructions to string
  return await con.query(sql)
}

async function display(mood, userId) {
  const sql = `SELECT instructions FROM exercises
  WHERE userId = ${userId}
  AND exerciseMood = '${mood}'
  `

  const insert = await con.query(sql)
  console.log(insert[0].instructions)

  return insert[0]
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

module.exports = { getExercise, setInstructions, createEntries, display }