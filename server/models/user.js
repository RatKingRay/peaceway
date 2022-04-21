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

function userExists(emailTemp) {
  return users.filter((u) => u.email === emailTemp);
}

module.exports = { getUsers, login, register, deleteUser };
