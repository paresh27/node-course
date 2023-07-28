const fs = require("fs");
const chalk = require("chalk");
const getNotes = function () {
  return "Your notes...";
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });
  if (duplicateNotes.length === 0) {
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

const removeNote = function (title) {
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
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title;
  });
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const saveNotes = function (notes) {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};
const loadNotes = function () {
  try {
    const buffer = fs.readFileSync("notes.json");
    const dataJSON = buffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
};
