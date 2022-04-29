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

const budgetList = [
    {
      budgetId: 24,
      weekly_limit: 150,
      weekly_current: 73,
      last_week_carryover: 20
    }
]

let getBudget = () => budget;

function update(budget) {
  // const n = noteExists(note.noteId);
  // if(n.length>0) throw Error('Note already exists')
  
  const updateBudget = {
    budgetId: budget[exercises.length-1].budgetId + 1,
    weekly_limit: budget.weekly_limit,
    weekly_current: budget.weekly_current,
    last_week_carryover: budget.last_week_carryover
  }
  
  budgetList.push(updateBudget)   //to put onto stack of user objects
  return updateBudget
}