const con = require("./db_connect")
//Need to make it so only 1 table per user
async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS budget (
    userId INT NOT NULL,
    weeklyLimit SMALLINT NOT NULL,
    weeklyCurrent SMALLINT,
    lastWeekCarryover SMALLINT,
    CONSTRAINT userPk PRIMARY KEY(userId),
    CONSTRAINT userFk FOREIGN KEY(userId) REFERENCES users(userId)
  )`
  //budgetId INT NOT NULL AUTO_INCREMENT,
  //CONSTRAINT budgetPk PRIMARY KEY(budgetId)

  await con.query(sql)
  // const sql2 = `DELETE FROM budget`
  // await con.query(sql2)
}
createTable()

//need to inner join to use fkeys, but NEED TO GET THEM IN FIRST!!
async function createEntry(userId) {
  console.log(`in createEntry models ${userId}`)
  const sql = `INSERT IGNORE INTO budget (userId, weeklyLimit)
  VALUES ( '${userId}', '0' )
  `
  //INSERT IGNORE INTO
  await con.query(sql)
}

let getBudget = () => budget;


// async function update() {
//   const sql = `INSERT INTO notes (weeklyLimit, weeklyCurrent, lastWeekCarryover)
//   VALUES ("${budget.weeklyLimit}", "${budget.weeklyCurrent}", "${budget.lastWeekCarryover}" )
//   `

//   const insert = await con.query(sql)
//   return insert
// }

async function update(weeklyLimit, userId) {
  const sql = `UPDATE budget SET
  weeklyLimit = ${weeklyLimit}
  WHERE userId = ${userId}
  `
  //  WHERE userId = ${user.userId}
  return await con.query(sql)
}

async function display(userId) {
  const sql = `SELECT weeklyLimit FROM budget
  WHERE userId = ${userId}
  `
  const answer = await con.query(sql)
  // console.log(answer)
  // console.log(answer.weeklyLimit)
  return answer[0]
}

//For initial creation, likely don't want/need
// async function create(budget) {
//   const sql = `INSERT INTO budget (weeklyLimit)
//   VALUES ("${budget.weeklyLimit}")
//   `

//   const insert = await con.query(sql)
//   return insert
// }

// async function getUserTable(userId) {
//   const sql = `SELECT userId FROM users
//   WHERE email = "${userId}"
//   `
//   const userIdResult = await con.query(sql)

//   const sql2 = `SELECT * FROM budget
//   WHERE userId = "${userIdResult}
//   `

//   const budgetTable = await con.query(sql2)
//   return budgetTable
// }

async function clear() {
  const sql = `DELETE FROM notes
  WHERE noteId = ${noteId}
  `
  const insert = await con.query(sql)
}

module.exports = { update, clear, getBudget, display, createEntry }