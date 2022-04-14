
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
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



const loginForm = document.getElementById("loginForm")
if(loginForm) loginForm.addEventListener('submit', login)

function login(e) {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    postData('http://localhost:5500/users/login', {email: email, password: password})
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

    postData('http://localhost:5500/users/register', {email: emailTemp, password: passwordTemp})
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
