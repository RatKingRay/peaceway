
import 
{ fetchData, getCurrentUser } 
from './main.js'

initialCreate()
// document.getElementById("budgetButton").addEventListener('click', setLimit) 
document.getElementById('emotionSelector').addEventListener('change', display)
document.getElementById('instructionButton').addEventListener('click', setInstructions)


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
  const instruDisplay = document.getElementById("instructionDisplay")

  fetchData('/exercise/display', {mood: moodTemp, userId: user.userId}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log(data)
      console.log(data.instructions)
      instruDisplay.innerHTML = data
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })

}

function setInstructions() {

  const user = getCurrentUser()
  const instruTemp = document.getElementById("instruction").value
  const instruEmoTemp = document.getElementById("instructionSelector").value
  console.log(instruTemp)
  console.log(instruEmoTemp)

  fetchData('/exercise/setInstructions', {instructionMood: instruEmoTemp, instructions: instruTemp, userId: user.userId}, "POST")
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

// function reset(e) {
//   e.preventDefault()
//   console.log("hello in reset function")

//   const user = getCurrentUser()

//   fetchData('/budget/reset', {userId: user.userId}, "POST")
//   .then((data) => {
//     if(!data.message) {
//       console.log("Post success")
//     }
//   })
//   .catch((error) => {
//     const errText = error.message;
//     console.log(`Error! ${errText}`)
//   })

//   window.location.href = "budget.html"
// }

//Make code to update the limit by subtracting last week & updating last week with this week
