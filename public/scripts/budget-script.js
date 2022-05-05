
import 
{ fetchData, getCurrentUser } 
from './main.js'

initialCreate()
weeklyLimitDisplay() // <---- This is making it so we can't save & reload without causing a crash


let budgetForm = document.getElementById("budgetForm")
// if(budgetForm) {
//   budgetForm.addEventListener('submit', function (e) {
//     if (e.target.classList.contains('limit')) {
//       setLimit()
//     }
//   })
// }
if(budgetForm) budgetForm.addEventListener('submit', setLimit)

let addBtn = document.getElementById("deduct")
if(addBtn) addBtn.addEventListener('submit', add)


function setLimit(e) {
  e.preventDefault()

  const user = getCurrentUser()
  const budgetTemp = document.getElementById("weekly_budget").value

  fetchData('/budget/update', {weeklyLimit: budgetTemp, userId: user.userId}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log("Post success")
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })

  window.location.href = "budget.html"
  document.getElementById("weekly_budget").value = ""
}

function add(e) {
  e.preventDefault()
  console.log("hello in add function")

  const user = getCurrentUser()
  const addTemp = document.getElementById("deduct").value  

  fetchData('/budget/add', {userId: user.userId}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log("Post success")
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })
}

function initialCreate() {
  const user = getCurrentUser()
  // console.log(`In InitialCreate() ${user} or ${user.userId}`)

  fetchData('/budget/createEntry', {userId: user.userId}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log("Post success")
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })
}


function weeklyLimitDisplay() {

  const user = getCurrentUser()

  let budgetDisplay = document.getElementById("budget-display")

  fetchData('/budget/display', {userId: user.userId}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log(data.weeklyLimit)
      budgetDisplay.innerHTML = `Current Limit: $${data.weeklyLimit}`
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })

}

//Make code to update the limit by subtracting last week & updating last week with this week
