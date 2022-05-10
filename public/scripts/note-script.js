
import 
{ fetchData, getCurrentUser } 
from './main.js'

//Have to make code to wipe is_vent notes
/* We can make a date variable in the talbe that stores when created
and when the note page loads it will read the date in and subtract 7 days
and if the answer is 0 >= x then we wipe the note*/

let user = getCurrentUser()
if(!user) window.location.href = "login.html"

display()

document.getElementById("noteForm").addEventListener('submit', addNote)

function displayNotes(note) {

  const flexNotes = document.getElementById("flex-notes")
  const contentTemp = note.content
  const noteId = note.noteId
  let is_ventTemp
  if(note.is_vent === 1) {
    is_ventTemp = "Yes"
  } else {
    is_ventTemp = "No"
  }

  let p = document.createElement('p')
  p.className = "note"
  p.innerHTML = `
    ${contentTemp}
    <hr>
    Vent?: ${is_ventTemp}
    <button class="button" id="deleteBtn">Delete</button>
  `

  p.addEventListener('click', function (e) {
    if (e.target.classList.contains('button')) {
      deleteNote(noteId)
    }
  })

  flexNotes.appendChild(p)

  document.getElementById("note").value = ""
}

function addNote(e) {
  e.preventDefault()

  const user = getCurrentUser()
  const contentTemp = document.getElementById("note").value
  let is_ventTemp
  if(document.getElementById("is_vent").checked) {
    is_ventTemp = 1
  } else {
    is_ventTemp = 0
  }

  fetchData('/notes/create', {userId: user.userId, content: contentTemp, is_vent: is_ventTemp}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log(data)
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })

  window.location.href = "notes.html"
}

function deleteNote(noteIdTemp) { 
  fetchData('/notes/delete', {noteId: noteIdTemp}, "DELETE")   //Sends parameters to routes, have to use key
  .then((data) => { 
    if(!data.message) {
      console.log(data.success)
      window.location.href = "notes.html"
    }
  })
  .catch((error) => {
    const errText = error.message 
    console.log(`Error! ${errText}`)
  })
}

function display() {
  const user = getCurrentUser()

  fetchData('/notes/display', {userId: user.userId}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log(data.success)
      data.forEach(note => displayNotes(note))
    }
  })
  .catch((error) => {
    const errText = error.message 
    console.log(`Error! ${errText}`)
  })
}
