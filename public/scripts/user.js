
/*
let user = getCurrentUser()
if(!user) window location.href = html
let profile= documnet.getElemenyBYId
profile.innerHTML = `
    <h2>
    etc
    `
*/

async function fetchData(url = '', data = {}, methodType) {
    console.log(data)
    const response = await fetch(`http://localhost:5500${url}`, {
      method: methodType, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
        //Problem is response isn't ok, https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
        return await response.json() // parses JSON response into native JavaScript objects
    } else {
        throw await response.json()
    }
}

function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

function editAccount(e) {
    e.preventDefault()
}


const loginForm = document.getElementById("loginForm")
if(loginForm) loginForm.addEventListener('submit', login)

function login(e) {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    fetchData('/users/login', {email: email, password: password}, 'POST')
    .then((data) => {
        if(!data.message) {
            window.location.href = "notes.html"
        }
    })
    .catch((error) => {
        const errText = error.message
        console.log(`Error! ${errText}`)
    })


    console.log(email)
    console.log(password)
}

const registerForm = document.getElementById("registerForm")
if(registerForm) registerForm.addEventListener('submit', register)

function register(e) {
    e.preventDefault()

    const emailTemp = document.getElementById("email").value
    const passwordTemp = document.getElementById("password").value

    fetchData('/users/register', {email: emailTemp, password: passwordTemp}, 'POST')
    .then((data) => {
        if(!data.message) {
            setCurrentUser(data)
            window.location.href = "notes.html"
        }
    })
    .catch((error) => {
        const errText = error.message
        //document.querySelector("#registerForm p.error").innerHTML = errText
        document.getElementById("email").value = ""
        console.log(`Error! ${errText}`)
    })
}

//make useful functions come from main
//if there's no message then it wasn't an error
function deleteUser() {
    if(confirm('Are you sure you\'d like to delete account?')) {
        fetchData('user/delete', { userId: user.userId }, "DELETE")
        .then((data) => {
            if(!data.message) {
                console.log(data.success)
                logout()
                window.location.href = "register.html"
            }
        })
    }
}


module.exports = { fetchData }