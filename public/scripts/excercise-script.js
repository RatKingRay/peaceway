
import 
{ fetchData, getCurrentUser } 
from './main.js'

let user = getCurrentUser()
if(!user) window.location.href = "login.html"

initialCreate()


document.getElementById('emotionSelector').addEventListener('change', display)
document.getElementById('instructionButton').addEventListener('click', setInstructions)
document.getElementById('displayButton').addEventListener('click', clear)


function initialCreate() {
  const user = getCurrentUser()

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
  const moodTemp = document.getElementById("emotionSelector").value
  const instruDisplay = document.getElementById("instructionDisplay")

  fetchData('/exercise/display', {mood: moodTemp, userId: user.userId}, "POST")
  .then((data) => {
    if(!data.message) {
      console.log(data.instructions)
      instruDisplay.innerHTML = data.instructions
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
  const instruEmoTemp = document.getElementById("emotionSelector").value

  fetchData('/exercise/setInstructions', {instructionMood: instruEmoTemp, instructions: instruTemp, userId: user.userId}, "PUT")
  .then((data) => {
    if(!data.message) {
      console.log("Post success")
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })

  window.location.href = "exercises.html"
}

function clear() {

  const user = getCurrentUser()
  const instruEmoTemp = document.getElementById("emotionSelector").value

  fetchData('/exercise/clear', {instructionMood: instruEmoTemp, userId: user.userId}, "DELETE")
  .then((data) => {
    if(!data.message) {
      console.log("Post success")
    }
  })
  .catch((error) => {
    const errText = error.message;
    console.log(`Error! ${errText}`)
  })

  window.location.href = "exercises.html"
}