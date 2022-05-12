const con = require("./db_connect")
const date = require('date-and-time')

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS budget (
    budgetId INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    weeklyLimit SMALLINT DEFAULT 0 NOT NULL,
    weeklyCurrent SMALLINT DEFAULT 0 NOT NULL,
    lastWeekCarryover SMALLINT DEFAULT 0,
    budgetDate DATETIME DEFAULT '1900-01-01',
    CONSTRAINT userFk FOREIGN KEY(userId) REFERENCES users(userId),
    CONSTRAINT budgetPk PRIMARY KEY(budgetId)
  )`
  await con.query(sql)
}
createTable()

async function createEntry(userId) {
  const sql = `INSERT INTO budget (userId) 
    SELECT ${userId}
    WHERE NOT EXISTS 
      (SELECT userId
       FROM budget 
       WHERE userId = ${userId})
  `

  await con.query(sql)
}

let getBudget = () => budget;


async function update(weeklyLimit, userId) {
  let now = new Date();
  now = date.format(now, 'YYYY-MM-DD HH:mm:ss')

  const sql = `UPDATE budget SET
  weeklyLimit = ${weeklyLimit},
  budgetDate = '${now}'
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
}

async function display(userId) {
  //Comparing budget datetime to current datetime
  const now = new Date()
  console.log(`Current time is: ${date.format(now, 'YYYY-MM-DD HH:mm:ss')}`)

  const sql3 = `SELECT * FROM budget
  WHERE userId = ${userId}
  `

  let budget = await con.query(sql3)
  let budgetDate = new Date(budget[0].budgetDate)
  console.log(`Budget ${budget[0].budgetId} was created at ${date.format(budgetDate, 'YYYY-MM-DD HH:mm:ss')}`)

  let dateSubtraction = date.subtract(now, budgetDate).toMinutes();
  console.log(`Time existed: ${dateSubtraction}`)
  if(dateSubtraction >= 10) {
    clear(userId)
    console.log("successfully cleared")
  }

  //Subtracting weeklyLimit by weeklyCurrent 
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

async function clear(userId) {
  let now = new Date();
  now = date.format(now, 'YYYY-MM-DD HH:mm:ss')

  const sql = `UPDATE budget SET
  weeklyCurrent = '0',
  budgetDate = '${now}'
  WHERE userId = ${userId}
  `
  const insert = await con.query(sql)
}

module.exports = { update, clear, getBudget, display, createEntry, add }