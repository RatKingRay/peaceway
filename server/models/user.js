const users = [
    {
        userId: 12345,
        username: "Raymondhey21",
        password: "tiramisu42"
    },
]

function register(user) {
    const u = userExists(user.email)
    if(u.length>0) throw Error('Email already in use')
    const newUser = {
        userId: users[users.length-1].userId + 1,
        tempEmail: user.email,
        password: user.password
    }
    users.push(newUser)

    return newUser
}

function userExists(email) {
    return users.filter((u) => u.tempEmail === email)
}

let getUsers = () => users

function login(email, password) {
    const user = user.filter((u) => tempEmail === email)
    if(!user[0]) throw Error('User not found')
    if(user[0].password !== password) throw Error('Password not correct')

    return user[0]
}

module.exports = { getUsers, login, register }