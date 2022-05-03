const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
    userId INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    fName VARCHAR(50),
    password VARCHAR(50) NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY(userId)
  )`
  await con.query(sql)
}
createTable()

const users = [
  {
    userId: 12345,
    fName: "Raymond",
    email: "raymond",
    password: "123"
  },
  {
    userId: 55555,
    fName: "Sal",
    email: "fredburger54",
    password: "password"
  },
  {
    userId: 34212,
    fName: "Nick",
    email: "coolcathy34",
    password: "badpassword"
  }
]

let getUsers = async () => {
  const sql = "SELECT * FROM users"
  return await con.query(sql)   //Have to use await and async because query is async
}

// function login(emailTemp, password) {
//   const user = userExists(emailTemp);
//   if(!user[0]) throw Error('User not found');
//   if(user[0].password !== password) throw Error('Password is incorrect.');

//   return user[0];
// }

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

  const sql = `INSERT INTO users (email, password)
  VALUES ("${user.email}", "${user.password}")
  `

  const insert = await con.query(sql)
  const newUser = await getUser(user)
  return newUser[0]
}

async function deleteUser(userId) {
  const sql = `DELETE FROM users
  WHERE userId = ${userId}
  `
  const insert = await con.query(sql)
}

// async function editUser(user) {
//   const u = userIdExists(user.userId)
//   if(!u[0]) throw Error('User not found');
//   u[0].email = user.email
//   return u[0]
// }

async function editUser(user) {
  const sql = `UPDATE users SET
  email = "${user.email}"
  WHERE userId = ${user.userId}
  `
  return await con.query(sql)
}

async function userExists(emailTemp) {
  const sql = `SELECT * FROM users
  WHERE email = "${emailTemp}"
  `
  return await con.query(sql)
}

//Since we were changing the email I believed that we shouldn't be checking for the new email value being passed
function userIdExists(userIdTemp) {
  return users.filter((u) => u.userId === userIdTemp)
}

module.exports = { getUsers, login, register, deleteUser, editUser };
