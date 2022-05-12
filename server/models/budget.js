const con = require("./db_connect")

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS budget (
    userId INT NOT NULL,
    weeklyLimit SMALLINT NOT NULL,
    weeklyCurrent SMALLINT NOT NULL,
    lastWeekCarryover SMALLINT,
    CONSTRAINT userFk FOREIGN KEY(userId) REFERENCES users(userId)
  )`
  await con.query(sql)
}
createTable()

async function createEntry(userId) {
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
  let newValue = (previousValue[0].weeklyCurrent + parseInt(newWeeklyCurrent))

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