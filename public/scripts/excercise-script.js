
import 
{ fetchData } 
from './main.js'


let noteForm = document.getElementById("weekly_budget")
if(weekly_budget) noteForm.addEventListener('submit', setLimit)

function setLimit(e) {
    e.preventDefault()

    const budgetTemp = document.getElementById("weekly_budget").value

    fetchData('/exercise/create', {weekly_limit: budgetTemp}, "POST")
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
