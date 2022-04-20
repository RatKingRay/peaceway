
class User {
    constructor(id, fName, lName, email, bDay, password) {
        this.userId = id
        this.fName = fName
        this.lName = lName
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



import 
{ fetchData, getCurrentUser } 
from './main.js'

let noteForm = document.getElementById("noteForm")
if(noteForm) noteForm.addEventListener('submit', addNote)

function addNote(e) {
    e.preventDefault()

    const flexNotes = document.getElementById("flex-notes")
    const note = document.getElementById("note").value

    fetchData('/notes/add', {content: note}, "POST")
    .then((data) => {
      if(!data.message) {
        console.log("Post success")
      }
    })
    .catch((error) => {
      const errText = error.message;
      console.log(`Error! ${errText}`)
    })

    //const newNote = new Note(note)
    //console.log(newNote)

    let p = document.createElement('p')
    p.appendChild(document.createTextNode(note))
    p.appendChild(document.createElement('br'))
    p.className = "note"
    flexNotes.appendChild(p)

    let button = document.createElement('button')
    button.appendChild(document.createTextNode("Delete"))
    button.id = "delete"
    button.className = "button"
    p.appendChild(button)


    document.getElementById("note").value = ""
}

let deleteBtn = document.getElementById("delete")
if(deleteBtn) deleteBtn.addEventListener('submit', deleteNote)

function deleteNote(e) {
    e.preventDefault()

    // function deleteAccount() {
    //     if(confirm('Are you sure you want to delete your account???')) {
    //       fetchData('/note/delete', {userId: user.userId}, "DELETE")
    //       .then((data) => {
    //         if(!data.message) {
    //           console.log(data.success)
    //           logout();
    //           window.location.href = "register.html"
    //         }
    //       })
    //       .catch((error) => {
    //         const errText = error.message;
    //         document.querySelector("#profile div p.error").innerHTML = errText;
    //         console.log(`Error! ${errText}`)
    //       })
    //     }
    //   }
}