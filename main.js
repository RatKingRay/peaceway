
let noteForm = document.getElementById("noteForm")
noteForm.addEventListener('submit', addNote)

function addNote(e) {
    e.preventDefault()
    alert("hello!")

    let flexNotes = document.getElementById("flex-notes")
    let note = document.getElementById("note").value

    //const newNote = new Note(note)
    //console.log(newNote)

    let p = document.createElement('p')
    p.appendChild(document.createTextNode(note))
    p.className = "note"

    flexNotes.appendChild(p)

    document.getElementById("note").value = ""
}

let x = 0
let registerForm = document.getElementById("registerForm")
registerForm.addEventListener('submit', createUser)

function createUser(e) {
    e.preventDefault()
    let id = x++
    let fName = document.getElementById("fName")
    let lName = document.getElementById("lName")
    let username = document.getElementById("username")
    let email = document.getElementById("username")
    let bDay = document.getElementById("bDay")
    let password = document.getElementById("password")
    const newUser = new User(id, fName, lName, username, email, bDay, password);
    console.log(newUser)
}

class User {
    constructor(id, fName, lName, username, email, bDay, password) {
        this.userId = id
        this.fName = fName
        this.lName = lName
        this.username = username
        this.email = email
        this.bDay = bDay
        this.password = password
    }
    getUserId() {
        return this.userId
    }
    getFName() {
        return this.fName
    }
    getLName() {
        return this.lName
    }
    getUsername() {
        return this.username
    }
    getEmail() {
        return this.email
    }
    getBDay() {
        return this.bDay
    }
    getPassword() {
        return this.password
    }

    setUserId(id) {
        this.userId = id
    }
    setFName(name) {
        this.fName = name
    }
    setLName(name) {
        this.LName = name
    }
    setUsername(name) {
        this.username = name
    }
    setEmail(email) {
        this.email = email
    }
    setBDay(day) {
        this.bDay = day
    }
    setPassword(password) {
        this.password = password
    }
}

