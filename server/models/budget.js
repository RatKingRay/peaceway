const con = require("./db_connect")
//Need to make it so only 1 table per user
async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS budget (
    budgetId INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    weeklyLimit SMALLINT NOT NULL UNIQUE,
    weeklyCurrent SMALLINT,
    lastWeekCarryover SMALLINT,
    CONSTRAINT budgetPk PRIMARY KEY(budgetId)
    
  )`
  //CONSTRAINT userFk FOREIGN KEY(userId) REFERENCES users(userId)
  await con.query(sql)
}
createTable()

async function createEntry(userId) {
  console.log(`in createEntry models ${userId}`)
  const sql = `INSERT INTO budget (userId)
  VALUES ( ${userId} )
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

  return await con.query(sql)
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