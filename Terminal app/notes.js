const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicate = notes.find((note) => note.title === title);
  if (duplicate) {
    console.log("The title is already taken. Choose a new title.");
  } else {
    notes.push({
      title,
      body,
    });
    saveNote(notes);
    console.log("Successfully added a note.");
  }
};

const loadNotes = () => {
  try {
    const noteFile = fs.readFileSync("notes.json").toString();
    return JSON.parse(noteFile);
  } catch (e) {
    return [];
  }
};

const saveNote = (notes) => {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

const removeNote = (title) => {
  const notes = loadNotes();
  const available = notes.find((note) => note.title === title);
  if (available) {
    const newNote = notes.filter((note) => {
      return note.title !== title;
    });
    saveNote(newNote);
    console.log("Successfully removed the note:", title);
  } else {
    console.log("The mentioned note doesn't exixst.");
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const foundNote = notes.find((note) => note.title === title);
  if (foundNote) {
    console.log("Title:", foundNote.title);
    console.log("Body:", foundNote.body);
  } else {
    console.log("No note found.");
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log("Your notes:");
  for (let note of notes) {
    console.log(note.title);
  }
};

module.exports = {
  addNote,
  loadNotes,
  removeNote,
  listNotes,
  readNote,
};
