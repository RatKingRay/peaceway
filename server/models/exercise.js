const exercises = [
    {
      exerciseId: 24,
      instructions: [
          "Do some painting",
          "Finish reading 'The Hobbit'"
        ],
      excercise_mood: "happy",
      is_active: "true"
    },
    {
      exerciseId: 25,
      instructions: [
        "Bake something fun",
        "Call friends"
        ],
      excercise_mood: "sad",
      is_active: "false"
    },
    {
      exerciseId: 26,
      instructions: [
        "Take a break",
        "Make an espresso"
        ],
      excercise_mood: "tired",
      is_active: "false"
    }
]

let getExercises = () => exercises;

function create(excercise) {
  // const n = noteExists(note.noteId);
  // if(n.length>0) throw Error('Note already exists')
  
  const newExcercise = {
    exerciseId: exercises[exercises.length-1].exerciseId + 1,
    instructions: exercise.instructions,
    excercise_mood: exercise.excercise_mood,
    is_active: exercise.is_active
  }
  
  exercises.push(newExcercise)   //to put onto stack of user objects
  return newExcercise
}