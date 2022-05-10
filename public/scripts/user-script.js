import 
{ fetchData, getCurrentUser, setCurrentUser, removeCurrentUser } 
from './main.js'

const loginForm = document.getElementById("loginForm");
if(loginForm) loginForm.addEventListener('submit', login);

const regForm = document.getElementById("registerForm");
if(regForm) regForm.addEventListener('submit', register);

function login(e) {
  e.preventDefault();

  const emailTemp = document.getElementById("email").value;
  const pswd = document.getElementById("pswd").value;
  fetchData('/users/login', {email: emailTemp, password: pswd}, "POST")
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "notes.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    document.querySelector("#loginForm p.error").innerHTML = errText;
    document.getElementById("pswd").value = "";
    console.log(`Error! ${errText}`)
  })
}

function register(e) {
  e.preventDefault();

  const emailTemp = document.getElementById("email").value;
  const pswd = document.getElementById("pswd").value;

  fetchData('/users/register', {email: emailTemp, password: pswd}, "POST")
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "notes.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    document.querySelector("#registerForm p.error").innerHTML = errText;
    document.getElementById("pswd").value = "";
    console.log(`Error! ${errText}`)
  });
}
