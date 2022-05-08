const con = require("./db_connect")

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS budget (
    userId INT NOT NULL,
    weeklyLimit SMALLINT NOT NULL,
    weeklyCurrent SMALLINT NOT NULL,
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

async function createEntry(userId) {
  // const sql = `DROP TABLE budget`
  //IGNORE because we need to intially create a unique budget for each user, but one might already exist
  const sql = `INSERT IGNORE INTO budget (userId, weeklyLimit, weeklyCurrent)
  VALUES ( '${userId}', '0', '0')
  `

  await con.query(sql)
}

let getBudget = () => budget;


async function update(weeklyLimit, userId) {
  const sql = `UPDATE budget SET
  weeklyLimit = ${weeklyLimit}
  WHERE userId = ${userId}
  `

  return await con.query(sql)
}

async function add(newWeeklyCurrent, userId) {
  const sql = `SELECT weeklyCurrent FROM budget
  WHERE userId = ${userId}
  `
  const previousValue = await con.query(sql)
  // console.log(typeof previousValue[0].weeklyCurrent)
  // console.log(typeof parseInt(newWeeklyCurrent))
  let newValue = (previousValue[0].weeklyCurrent + parseInt(newWeeklyCurrent))
  //is increasing though!
  console.log(`Over here! ${newValue}`)

  const sql2 = `UPDATE budget SET
  weeklyCurrent = ${newValue}
  WHERE userId = ${userId}
  `
  const insert = await con.query(sql2)
  //Return?
}

async function display(userId) {
  const sql = `SELECT weeklyLimit FROM budget
  WHERE userId = ${userId}
  `

  const sql2 = `SELECT weeklyCurrent FROM budget
  WHERE userId = ${userId}
  `
  const weeklyCurrent = await con.query(sql2)
  const weeklyLimit = await con.query(sql)

  const tempWeek = weeklyCurrent[0]
  const tempLimit = weeklyLimit[0]

  const temp = tempLimit.weeklyLimit - tempWeek.weeklyCurrent

  
  return temp
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

async function reset(userId) {
  const sql = `UPDATE budget SET
  weeklyCurrent = '0'
  WHERE userId = ${userId}
  `

  return await con.query(sql)
}

async function clear(userId) {
  const sql = `UPDATE budget SET
  weeklyCurrent = '0'
  WHERE userId = ${userId}
  `
  const insert = await con.query(sql)
}

module.exports = { update, clear, getBudget, display, createEntry, add }