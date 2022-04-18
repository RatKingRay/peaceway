const users = [
    {
        userId: 12345,
        email: "Raymondhey21",
        password: "tiramisu42"
    },
]

let getUsers = () => users

function deleteUser(user) {
    let i = users.map((user) => user.userId ).indexOf(userId)
    users.splice(i, 1)
    //something else here
}

function register(user) {
    const u = userExists(user.email)
    if(u.length > 0) throw Error('Email already in use')

    const newUser = {
        userId: users[users.length-1].userId + 1,
        email: user.email,
        password: user.password
    }

    users.push(newUser)
    console.log("Success")

    return newUser
}

function userExists(email) {
    return users.filter((u) => u.emailTemp === email)
}

function login(email, password) {
    const user = user.filter((u) => emailTemp === email)
    if(!user[0]) throw Error('User not found')
    if(user[0].password !== password) throw Error('Password not correct')

    return user[0]
}

function editUser(user) {
    const u = userExists(user.email)
    if(u.length > 0)
        throw ('Email already in use')
    const cUser = users.filter((u) => u.userId === user.userId)
    cUser[0].email = user.email
    return cUser[0]
}

module.exports = { getUsers, login, register, userExists, deleteUser, editUser }