import 
{ getCurrentUser, setCurrentUser, removeCurrentUser, logout, fetchData } 
from './main.js'


let user = getCurrentUser()

if(!user) window.location.href = "login.html"

let profile = document.getElementById("profile") 
profile.innerHTML = `
  <h2>Welcome back, ${user.fName}!</h2>
  <div>
    <p class="error"></p>
    <ul>
      <li><button class="button" id="edit">Edit Info</button></li>
      <li><button class="button" id="delete">Delete Account</button></li>
    </ul>
  </div>
`

document.getElementById("edit").addEventListener('click', editProfile) 
document.getElementById("delete").addEventListener('click', deleteAccount) 

function editProfile() {
  // profile.classList.toggle("hide") 
  let editForm = document.getElementById("editForm") 
  editForm.classList.toggle("hide") 
  editForm.innerHTML = `
    <form class="basic-form" id="emailForm">
      <p class="error"></p>
      <label for="emailInput">Change Email</label>
      <input type="text" name="emailInput" id="emailInput" placeholder="${user.email}">
      <br>
      <input type="submit" id="edit" class="button" value="Submit">
    </form>

    <form class="basic-form" id="passForm">
      <p class="error"></p>
      <label for="pswd">Change Password</label>
      <input type="password" name="pswd" id="pswd">
      <br>
      <input type="submit" class="button" value="Submit">
    </form>
    <!-- <button class="button" id="cancel">Cancel</button> -->
  `
  editForm.addEventListener('submit', editAccount)
  // document.getElementById("cancel").addEventListener('click', (e) => {
  //   window.location.href = "profile.html" 
  // })
}

function editAccount(e) {
  e.preventDefault();

  const emailTemp = document.getElementById("emailInput").value
  if(emailTemp === user.email) {
    let err = "No changes made"
    document.querySelector("#editForm p.error").innerHTML = err
  }
  else {
    fetchData('/users/edit', {userId: user.userId, email: emailTemp}, "PUT")
    .then((data) => {
      if(!data.message) {
        removeCurrentUser()
        setCurrentUser(data)
        window.location.href = "profile.html"
      }
    })
    .catch((error) => {
      const errText = error.message 
      document.querySelector("#editForm p.error").innerHTML = errText 
      console.log(`Error! ${errText}`)
    }) 
  }
}

function deleteAccount(e) {
  e.preventDefault();

  if(confirm('Are you sure you want to delete your account?')) {
    fetchData('/users/delete', {userId: user.userId}, "DELETE")
    .then((data) => {
      if(!data.message) {
        console.log(data.success)
        logout() 
        window.location.href = "register.html"
      }
    })
    .catch((error) => {
      const errText = error.message 
      document.querySelector("#profile div p.error").innerHTML = errText 
      console.log(`Error! ${errText}`)
    })
  }
}