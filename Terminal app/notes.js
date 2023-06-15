const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicate = notes.filter((note) => {
    return note.title === title;
  });
  if (duplicate.length > 0) {
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
  const available = notes.filter((note) => {
    return note.title === title;
  });
  if (available.length > 0) {
    const newNote = notes.filter((note) => {
      return note.title !== title;
    });
    saveNote(newNote);
    console.log("Successfully removed the note:", title);
  } else {
    console.log("The mentioned title doesn't exixst.");
  }
};

module.exports = {
  addNote,
  loadNotes,
  removeNote,
};
