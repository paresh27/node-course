const myNotes = require("./notes.js");
const chalk = require("chalk");
const yargs = require("yargs");

// customize yargs version
yargs.version("1.1.0");

// creating add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("Title", argv.title);
    console.log("Body", argv.body);
  },
});

//creating remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("Title", argv.title);
  },
});

//creating list command
yargs.command({
  command: "list",
  describe: "List all notes",
  handler: function () {
    console.log("Listing all notes!");
  },
});

//creating read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("Title", argv.title);
  },
});

// console.log(yargs.argv);
yargs.parse();
