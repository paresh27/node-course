const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title); //stop at the first occurrence
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  // const noteToBeRemovedIndex = notes.findIndex(function (note) {
  //   return note.title === title;
  // });
  // if (noteToBeRemovedIndex >= 0) {
  //   notes.splice(noteToBeRemovedIndex, 1);
  //   saveNotes(notes);
  //   console.log("Note removed!");
  // } else {
  //   console.log(`Note with the title ${title} not found!`);
  // }
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNodes = () => {
  console.log(chalk.blue.inverse("Your notes"));
  const notes = loadNotes();
  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNotes();
  const matchedNote = notes.find((note) => note.title === title);
  if (matchedNote) {
    console.log(chalk.green.inverse(matchedNote.title));
    console.log(matchedNote.body);
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};
const loadNotes = () => {
  try {
    const buffer = fs.readFileSync("notes.json");
    const dataJSON = buffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNodes: listNodes,
  readNote: readNote,
};
