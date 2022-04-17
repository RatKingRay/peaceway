







/*
export function logout

export function login

export function getCurrentUser{

}
//Check user exists in inner storage

const nav = document.querySelector('nav')
if(getCurrentUser()) {
    nav.innerHTML = `
    <ul>
        <li><a href="login.html">Login</a></li>
        <li><a href="notes.html">Notes</a></li>
        <li><a href="budget.html">Budget</a></li>
        <li><a href="exercises.html">Exercises</a></li>
        <button>Logout</button>
    </ul>
    `
}

} else {
    nav.innerHTML = `
    <ul>
            <li><a href="login.html">Login</a></li>
            <li><a href="register.html">Register</a></li>
    </ul>
    `
}

*/




// // const registerForm = document.getElementById("registerForm")
// // if(registerForm) registerForm.addEventListener('submit', register)

// // function register(e) {
// //     e.preventDefault()

// //     const email = document.getElementById("email").value
// //     const password = document.getElementById("password").value

// //     postData('http://localhost:3000/users/login', {email: email, password: password})

// //     let id = x++
// //     let fName = document.getElementById("fName").value
// //     let lName = document.getElementById("lName").value
// //     let email = document.getElementById("email").value
// //     let bDay = document.getElementById("bDate").value
// //     let password = document.getElementById("password").value

// //     const newUser = new User(id, fName, lName, email, bDay, password);
// //     console.log(newUser)
// // }


// class User {
//     constructor(id, fName, lName, email, bDay, password) {
//         this.userId = id
//         this.fName = fName
//         this.lName = lName
//         this.email = email
//         this.bDay = bDay
//         this.password = password
//     }
//     getUserId() {
//         return this.userId
//     }
//     getFName() {
//         return this.fName
//     }
//     getLName() {
//         return this.lName
//     }
//     getEmail() {
//         return this.email
//     }
//     getBDay() {
//         return this.bDay
//     }
//     getPassword() {
//         return this.password
//     }

//     setUserId(id) {
//         this.userId = id
//     }
//     setFName(name) {
//         this.fName = name
//     }
//     setLName(name) {
//         this.LName = name
//     }
//     setEmail(email) {
//         this.email = email
//     }
//     setBDay(day) {
//         this.bDay = day
//     }
//     setPassword(password) {
//         this.password = password
//     }
// }




// /*
//     I tested this section of code below and it works, but only if the top half trying
//     to find a 'register' page isn't present. Solution is probably to have two seperate
//     JS files?
// */
// let noteForm = document.getElementById("noteForm")
// noteForm.addEventListener('submit', addNote)

// function addNote(e) {
//     e.preventDefault()

//     let flexNotes = document.getElementById("flex-notes")
//     let note = document.getElementById("note").value

//     //const newNote = new Note(note)
//     //console.log(newNote)

//     let p = document.createElement('p')
//     p.appendChild(document.createTextNode(note))
//     p.appendChild(document.createElement('br'))
//     p.className = "note"
//     flexNotes.appendChild(p)

//     let button = document.createElement('button')
//     button.appendChild(document.createTextNode("Delete"))
//     button.id = "delete"
//     button.className = "button"
//     p.appendChild(button)


//     document.getElementById("note").value = ""
// }

// let button = document.getElementById("delete")
// button.addEventListener('submit', deleteNote)

// function deleteNote(e) {
//     e.preventDefault()

// }