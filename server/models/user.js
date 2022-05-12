const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
    userId INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    fName VARCHAR(50),
    lName VARCHAR(50),
    bDay DATE,
    CONSTRAINT user_pk PRIMARY KEY(userId)
  )`
  await con.query(sql)
}
createTable()

let getUsers = async () => {
  const sql = "SELECT * FROM users"
  return await con.query(sql)
}

async function getUser(user) {
  let sql
  if(user.userId) {
    sql = `SELECT * FROM users
    WHERE userId = ${user.userId}`
  } else {
    sql = `SELECT * FROM users
    WHERE email = "${user.email}"
    `
  }
  return await con.query(sql)
}

async function login(emailTemp, passwordTemp) {
  const user = await userExists(emailTemp)

  if(!user[0]) throw Error('User not found')
  if(user[0].password !== passwordTemp) throw Error('Password is incorrect.')

  return user[0]
}

async function register(user) {
  const u = userExists(user.email)
  if(u.length > 0) throw Error('Email already in use')
  
  const sql = `INSERT INTO users (email, password, fName, lName, bDay)
  VALUES ("${user.email}", "${user.password}", "${user.fName}", "${user.lName}", "${user.bDay}")
  `

  const insert = await con.query(sql)
  const newUser = await getUser(user)
  return newUser[0]
}

async function deleteUser(userId) {
  const sql1 = `DELETE FROM budget
  WHERE userId = ${userId}
  `
  const sql2 = `DELETE FROM exercises
  WHERE userId = ${userId}
  `
  const sql3 = `DELETE FROM notes
  WHERE userId = ${userId}
  `
  const sql4 = `DELETE FROM users
  WHERE userId = ${userId}
  `
  await con.query(sql1)
  await con.query(sql2)
  await con.query(sql3)
  await con.query(sql4)
}

async function editUser(user) {
  const sql = `UPDATE users SET
  email = "${user.email}"
  WHERE userId = ${user.userId}
  `

  await con.query(sql)
  const newUser = await getUser(user)
  return newUser[0]
}

async function editUserPass(user) {
  const sql = `UPDATE users SET
  password = "${user.password}"
  WHERE userId = ${user.userId}
  `

  await con.query(sql)
  const newUser = await getUser(user)
  return newUser[0]
}

async function userExists(emailTemp) {
  const sql = `SELECT * FROM users
  WHERE email = "${emailTemp}"
  `
  return await con.query(sql)
}

module.exports = { getUsers, login, register, deleteUser, editUser, editUserPass };
