import 
{ getCurrentUser, setCurrentUser, removeCurrentUser, logout, fetchData } 
from './main.js'


let user = getCurrentUser()

if(!user) window.location.href = "login.html"

let profile = document.getElementById("profile");
profile.innerHTML = `
  <h2>Welcome back, ${user.fName}!</h2>
  <div>
    <p class="error"></p>
    <ul>
      <li><button class="button" id="editForm">Edit Info</button></li>
      <li><button class="button" id="delete">Delete Account</button></li>
    </ul>
  </div>
`

document.getElementById("editForm").addEventListener('click', editProfile);
document.getElementById("delete").addEventListener('click', deleteAccount);

function editProfile() {
  profile.classList.toggle("hide");
  let editForm = document.getElementById("editForm");
  editForm.innerHTML = `
    <form id="emailForm">
      <p class="error"></p>
      <h2>Edit Profile</h2>
      <label for="username">Change Username</label>
      <input type="text" name="username" id="username" placeholder="${user.userName}">
      <br>
      <input type="submit" class="button" value="Submit">
    </form>

    <form id="passForm">
      <p class="error"></p>
      <h2>Change Password</h2>
      <label for="pswd">Change Password</label>
      <input type="password" name="pswd" id="pswd">
      <br>
      <input type="submit" value="Submit">
    </form>
    <button class="btn" id="cancel">Cancel</button>
  `

  editForm.addEventListener('submit', editAccount)
  document.getElementById("cancel").addEventListener('click', (e) => {
    window.location.href = "profile.html";
  })
}

function editAccount(e) {
  
    // .catch((error) => {
    //   const errText = error.message;
    //   document.querySelector("#editForm p.error").innerHTML = errText;
    //   console.log(`Error! ${errText}`)
    // });
  
}

function deleteAccount() {
  if(confirm('Are you sure you want to delete your account?')) {
    fetchData('/users/delete', {userId: user.userId}, "DELETE")
    .then((data) => {
      if(!data.message) {
        console.log(data.success)
        logout();
        window.location.href = "register.html"
      }
    })
    .catch((error) => {
      const errText = error.message;
      document.querySelector("#profile div p.error").innerHTML = errText;
      console.log(`Error! ${errText}`)
    })
  }
}