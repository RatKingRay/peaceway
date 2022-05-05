
import 
{ fetchData, getCurrentUser } 
from './main.js'

weeklyLimitDisplay() // <---- This is making it so we can't save & reload without causing a crash
initialCreate()

let budgetForm = document.getElementById("budgetForm")
if(budgetForm) budgetForm.addEventListener('submit', setLimit)

function setLimit(e) {
  e.preventDefault()
  console.log("inSetLimit")

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
}

function initialCreate() {
  const user = getCurrentUser()
  console.log(`In InitialCreate() ${user} or ${user.userId}`)
  
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
  let dataTemp

  fetchData('/budget/display', {userId: user.userId}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log(data.weeklyLimit)
      dataTemp = data.weeklyLimit
      // console.log("Post success")
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })

  budgetDisplay.innerHTML = `${dataTemp}`

}

//Make code to update the limit by subtracting last week & updating last week with this week
