const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(50),
    CONSTRAINT user_pk PRIMARY KEY(user_id)
  )`
  await con.query(sql)
}

// con.connect(function(err) {
//   if(err) throw err
//   let sql = `CREATE TABLE IF NOT EXISTS users (
//     user_id INT NOT NULL AUTO_INCREMENT,
//     user_email VARCHAR(255) NOT NULL UNIQUE,
//     user_password VARCHAR(50),
//     CONSTRAINT user_pk PRIMARY KEY(user_id)
//   )`
//   con.query(sql, function(err, result) {
//     if(err) throw err

//   })
// })

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

let getUsers = () => users;

function login(emailTemp, password) {
  const user = userExists(emailTemp);
  if(!user[0]) throw Error('User not found');
  if(user[0].password !== password) throw Error('Password is incorrect.');

  return user[0];
}

function register(user) {
  const u = userExists(user.email);
  if(u.length>0) throw Error('Email already exists')

  const newUser = {
    userId: users[users.length-1].userId + 1,
    fName: user.fName,
    email: user.email,
    password: user.password
  }
  users.push(newUser)   //to put onto stack of user objects
  return newUser
}

function deleteUser(userId) {
  let i = users.map((user) => user.userId).indexOf(userId);
  users.splice(i, 1);
  console.log(users)
}

function editUser(user) {
  const u = userIdExists(user.userId)
  if(!u[0]) throw Error('User not found');
  u[0].email = user.email
  return u[0]
}

function userExists(emailTemp) {
  return users.filter((u) => u.email === emailTemp)
}

//Since we were changing the email I believed that we shouldn't be checking for the new email value being passed
function userIdExists(userIdTemp) {
  return users.filter((u) => u.userId === userIdTemp)
}

module.exports = { getUsers, login, register, deleteUser, editUser };
