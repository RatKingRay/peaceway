
import 
{ fetchData } 
from './main.js'

// function setNote(note) {
//   localStorage.setItem('user', JSON.stringify(user));
// }

// function getNotes() {
//   return JSON.parse(localStorage.getItem('user'));
// }

let noteForm = document.getElementById("weekly_budget")
if(weekly_budget) noteForm.addEventListener('submit', setLimit)

function setLimit(e) {
    e.preventDefault()

    const budgetTemp = document.getElementById("weekly_budget").value

    fetchData('/notes/update', {weekly_limit: budgetTemp}, "POST")
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

//Make code to update the limit by subtracting last week & updating last week with this week
