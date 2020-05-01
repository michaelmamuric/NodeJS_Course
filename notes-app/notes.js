const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    // https://www.w3schools.com/jsref/jsref_filter.asp
    // Checks if array contains a note with the specified title
    // const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find((note) => note.title === title );

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note already exists!'));
    }
}

const removeNote = (title) => {
    // Challenge
    // 1) Load existing notes
    const notes = loadNotes();
    // 2) Use array filter method to remove matching note
    const notesToKeep = notes.filter((note) => note.title !== title);

    // Challenge: Use chalk to provide useful logs to remove
    if(notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'));
        // 3) Save newly-created array
        saveNotes(notesToKeep);
    }
    else
        console.log(chalk.red.inverse('No note found!'));
}

const saveNotes = (notes) => {
    const noteJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', noteJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);        
    } catch(e) {
        return [];
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.inverse('Your notes'));
    notes.forEach((note) => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title);

    if(noteToRead) {
        console.log(chalk.green.inverse('Title: ' + noteToRead.title));
        console.log('Body: ' + noteToRead.body);
    }
    else
        console.log(chalk.red.inverse('Note not found'));
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}