const users = [
    {
        userId: 12345,
        username: "Raymondhey21",
        password: "tiramisu42"
    },
]

function deleteUser(user) {
    let i = users.map((user) => user.userId ).indexOf(userId)
    users.splice(i, 1)
    //something else here
}

function editUser(user) {
    const u = userExists(user.email)
    if(u.length > 0) throw Error('Username already exists')

    //const cUser
}

function register(user) {
    const u = userExists(user.email)
    if(u.length > 0) throw Error('Email already in use')

    const newUser = {
        userId: users[users.length-1].userId + 1,
        emailTemp: user.email,
        password: user.password
    }

    users.push(newUser)
    console.log("Success")

    return newUser
}

function userExists(email) {
    return users.filter((u) => u.emailTemp === email)
}

let getUsers = () => users

function login(email, password) {
    const user = user.filter((u) => emailTemp === email)
    if(!user[0]) throw Error('User not found')
    if(user[0].password !== password) throw Error('Password not correct')

    return user[0]
}

module.exports = { getUsers, login, register, userExists, deleteUser }