const con = require("./db_connect")

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS exercises (
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
  const sqlSad = `INSERT INTO exercises (userId, instructions, exerciseMood) 
    SELECT '${userId}', 'Enter instructions!', 'sad'
    WHERE NOT EXISTS 
      (SELECT exerciseMood 
       FROM exercises 
       WHERE exerciseMood = 'sad'
       AND userId = ${userId})
  `
  const sqlHap = `INSERT INTO exercises (userId, instructions, exerciseMood) 
  SELECT '${userId}', 'Enter instructions!', 'happy'
  WHERE NOT EXISTS 
    (SELECT exerciseMood 
     FROM exercises 
     WHERE exerciseMood = 'happy'
     AND userId = ${userId})
  `
  const sqlAng = `INSERT INTO exercises (userId, instructions, exerciseMood) 
  SELECT '${userId}', 'Enter instructions!', 'angry'
  WHERE NOT EXISTS 
    (SELECT exerciseMood 
     FROM exercises 
     WHERE exerciseMood = 'angry'
     AND userId = ${userId})
  `
  const sqlBor = `INSERT INTO exercises (userId, instructions, exerciseMood) 
  SELECT '${userId}', 'Enter instructions!', 'bored'
  WHERE NOT EXISTS 
    (SELECT exerciseMood 
     FROM exercises 
     WHERE exerciseMood = 'bored'
     AND userId = ${userId})
  `
  const sqlAnx = `INSERT INTO exercises (userId, instructions, exerciseMood) 
  SELECT '${userId}', 'Enter instructions!', 'anxious'
  WHERE NOT EXISTS 
    (SELECT exerciseMood 
     FROM exercises 
     WHERE exerciseMood = 'anxious'
     AND userId = ${userId})
  `

  await con.query(sqlSad)
  await con.query(sqlHap)
  await con.query(sqlAng)
  await con.query(sqlBor)
  await con.query(sqlAnx)
}

async function setInstructions(instructionMood, instructions, userId) {
  //Here we concatenate the last instructions with the new instructions, adding a <li>
  const sql2 = `SELECT instructions FROM exercises
  WHERE userId = ${userId}
  AND exerciseMood = '${instructionMood}'
  `
  const insert = await con.query(sql2)
  let prevInstru = insert[0].instructions

  prevInstru = prevInstru.concat("<li>", instructions)


  const sql = `UPDATE exercises SET
  instructions = '${prevInstru}'
  WHERE userId = ${userId}
  AND exerciseMood = '${instructionMood}'
  `
  return await con.query(sql)
}


async function display(mood, userId) {
  const sql = `SELECT instructions FROM exercises
  WHERE userId = ${userId}
  AND exerciseMood = '${mood}'
  `

  const insert = await con.query(sql)
  return insert[0]
}


async function clear(instructionMood, userId) {
  const sql = `UPDATE exercises SET
  exerciseMood = Null
  WHERE userId = ${userId}
  AND exerciseMood = '${instructionMood}'
  `
  const insert = await con.query(sql)
  return insert
}

module.exports = { getExercise, setInstructions, createEntries, display, clear }