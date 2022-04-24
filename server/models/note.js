const notes = [
    {
      noteId: 12345,
      content: "hello",
    },
    {
      noteId: 55555,
      content: "fredburger54",
    },
    {
      noteId: 34212,
      content: "coolcathy34",
    }
]

let getNotes = () => notes;

function create(note) {
  // const n = noteExists(note.noteId);
  // if(n.length>0) throw Error('Note already exists')
  
  const newNote = {
    noteId: notes[notes.length-1].noteId + 1,
    content: note.content,
    mood: note.mood,
    is_vent: note.is_vent
  }
  
  notes.push(newNote)   //to put onto stack of user objects
  return newNote
}

function deleteNote(noteId) {
  let i = notes.map((note) => note.noteId).indexOf(noteId);
  notes.splice(i, 1);
  console.log(notes)
}

function noteExists(noteIdTemp) {
  return users.filter((u) => u.noteId === noteIdTemp)
}

module.exports = { create, getNotes, deleteNote }