const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// Get Third argument from argv
// First argument is the path to node.exe
// Second argument is the path to the .js file
/*
const command = process.argv[2];

console.log(process.argv);

if(command === 'add') {
    console.log('Adding note...');
}
else if(command === 'remove') {
    console.log('Removing note!');
}*/

// Customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    } 
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) { 
        notes.removeNote(argv.title);
    }
});

// Create list command
yargs.command({
    command: 'list',
    describe: 'Lists notes',
    handler() {
        notes.listNotes();
    }
});

// Create read command
yargs.command({
    command: 'read',
    describe: 'Reads notes',
    builder: {
        title: {
            describe: 'Title of the note to be read',
            demandOption: true,
            type: 'string'
        }        
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});


// add, remove, read, list
//console.log(yargs.argv);

yargs.parse();


