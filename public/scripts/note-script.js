
import 
{ fetchData } 
from './main.js'

//Have to make code to wipe is_vent notes

let noteForm = document.getElementById("noteForm")
if(noteForm) noteForm.addEventListener('submit', addNote)

function addNote(e) {
    e.preventDefault()

    const flexNotes = document.getElementById("flex-notes")
    const contentTemp = document.getElementById("note").value
    const moodTemp = document.getElementById("emotion").value
    const is_ventTemp = document.getElementById("is_vent").value

    fetchData('/notes/create', {content: contentTemp, mood: moodTemp, is_vent: is_ventTemp}, "POST")
    .then((data) => {
      if(!data.message) {
        console.log(data)
        localStorage.setItem('note', JSON.stringify(data))
        console.log("Post success")
      }
    })
    .catch((error) => {
      const errText = error.message;
      console.log(`Error! ${errText}`)
    })

    let p = document.createElement('p')
    p.className = "note"
    p.innerHTML = `
      ${contentTemp}
      <hr>
      <br>
      This made you feel: ${moodTemp}
      <br>
      <button class="button" id="deleteBtn">Delete</button>
    `
    p.addEventListener('click', deleteNote())

    // const newNote = new Note(note)
    // console.log(newNote)

    flexNotes.appendChild(p)

    document.getElementById("note").value = ""
}


//Btn is only local so we have a bit of an issue
//If we made it so we just retireved from database than we can just drop it from
//db and refresh the page
// let deleteBtn = document.getElementById("deleteBtn")
// if(deleteBtn) deleteBtn.addEventListener('click', deleteNote) 

function deleteNote() { 
  console.log("Hello?")
  
  fetchData('/users/delete_note', {noteId: note.noteId}, "DELETE")
  .then((data) => {
    if(!data.message) {
      console.log(data.success)
      window.location.href = "notes.html"
    }
  })
  .catch((error) => {
    const errText = error.message 
    // document.querySelector("#profile div p.error").innerHTML = errText 
    console.log(`Error! ${errText}`)
  })
}

// function displayNote(data) {
       
//     Select * from 
//     const flexNotes = data[0]
//     const contentTemp = document.getElementById("note").value
//     const moodTemp = document.getElementById("emotion").value
//     const is_ventTemp = document.getElementById("is_vent").value

//     //const newNote = new Note(note)
//     //console.log(newNote)
//     //return JSON.parse(localStorage.getItem('user'));

//     let p = document.createElement('p')
//     p.appendChild(document.createTextNode(contentTemp))
//     p.appendChild(document.createElement('hr'))
//     p.appendChild(document.createElement('br'))
//     p.appendChild(document.createTextNode(`This made you feel: ${moodTemp}`))
//     p.appendChild(document.createElement('br'))
//     p.className = "note"
//     flexNotes.appendChild(p)

//     let button = document.createElement('button')
//     button.appendChild(document.createTextNode("Delete"))
//     button.id = "deleteBtn"
//     button.className = "button"
//     p.appendChild(button)


//     document.getElementById("note").value = ""
// }

// function addNote(e) {
//     e.preventDefault()

//     const flexNotes = document.getElementById("flex-notes")
//     const contentTemp = document.getElementById("note").value
//     const moodTemp = document.getElementById("emotion").value
//     const is_ventTemp = document.getElementById("is_vent").value

//     fetchData('/notes/create', {content: contentTemp, mood: moodTemp, is_vent: is_ventTemp}, "POST")
//     .then((data) => {
//       if(!data.message) {
//         console.log("Post success")
//       }
//     })
//     .catch((error) => {
//       const errText = error.message;
//       console.log(`Error! ${errText}`)
//     })

//     retrieve()

//     //const newNote = new Note(note)
//     //console.log(newNote)

//     // let p = document.createElement('p')
//     // p.appendChild(document.createTextNode(contentTemp))
//     // p.appendChild(document.createElement('hr'))
//     // p.appendChild(document.createElement('br'))
//     // p.appendChild(document.createTextNode(`This made you feel: ${moodTemp}`))
//     // p.appendChild(document.createElement('br'))
//     // p.className = "note"
//     // flexNotes.appendChild(p)

//     // let button = document.createElement('button')
//     // button.appendChild(document.createTextNode("Delete"))
//     // button.id = "deleteBtn"
//     // button.className = "button"
//     // p.appendChild(button)


//     // document.getElementById("note").value = ""
// }

// function setNote(note) {
//   localStorage.setItem('user', JSON.stringify(user));
// }

// function getNotes(e) {
//   e.preventDefault()

//   return JSON.parse(localStorage.getItem('note'));
// }

// function retrieve() {
//   //Retrieve other stored notes and put them up here

//   // fetchData('/users/retrieve', {content: contentTemp, mood: moodTemp, is_vent: is_ventTemp}, "GET")
//   // .then((data) => {
//   //   if(!data.message) {
//   //     //displayNote(data)
//   //     data.forEach(note => console.log(note))
//   //     data.forEach(note => displayNote(note))
//   //     // window.location.href = "notes.html";
//   //   }
//   // })
//   // .catch((error) => {
//   //   const errText = error.message;
//   //   // document.querySelector("#loginForm p.error").innerHTML = errText;
//   //   // document.getElementById("pswd").value = "";
//   //   console.log(`Error! ${errText}`)
//   // })
// }