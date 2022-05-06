
import 
{ fetchData, getCurrentUser } 
from './main.js'

initialCreate()
weeklyLimitDisplay() // <---- This is making it so we can't save & reload without causing a crash


document.getElementById("budgetButton").addEventListener('click', setLimit) 
document.getElementById("addButton").addEventListener('click', add)
document.getElementById("reset").addEventListener('click', reset)


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

  document.getElementById("weekly_budget").value = ""
  window.location.href = "budget.html"
}

function add(e) {
  e.preventDefault()
  console.log("hello in add function")

  const user = getCurrentUser()
  const addTemp = document.getElementById("deduct").value
  console.log(addTemp)

  fetchData('/budget/add', {weeklyCurrent: addTemp, userId: user.userId}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log("Post success")
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })

  document.getElementById("weekly_budget").value = ""
}

function reset(e) {
  e.preventDefault()
  console.log("hello in reset function")

  const user = getCurrentUser()

  fetchData('/budget/reset', {userId: user.userId}, "POST")
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
