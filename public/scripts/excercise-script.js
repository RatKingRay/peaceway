
import 
{ fetchData, getCurrentUser } 
from './main.js'

initialCreate()


// document.getElementById("budgetButton").addEventListener('click', setLimit) 
document.getElementById('emotionSelector').addEventListener('change', display)
document.getElementById('instructionButton').addEventListener('change', setInstructions)



function setInstructions() {

  const user = getCurrentUser()
  const instruTemp = document.getElementById("instruction").value
  console.log(instruTemp)

  fetchData('/exercise/setInstructions', {instructions: instruTemp, userId: user.userId}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log("Post success")
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })

  window.location.href = "exercise.html"
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
  console.log(`In InitialCreate() ${user.userId}`)

  fetchData('/exercise/create', {userId: user.userId}, "POST")
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



function display() {

  const user = getCurrentUser()
  const moodTemp = document.getElementById("emotionSelector")

  fetchData('/exercise/display', {mood: moodTemp, userId: user.userId}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log(data.instructions)
      budgetDisplay.innerHTML = data.instructions
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })

}

//Make code to update the limit by subtracting last week & updating last week with this week
