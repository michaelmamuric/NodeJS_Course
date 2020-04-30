const fs = require('fs');
const chalk = require('chalk');

const getNotes = function() {
    return 'Your notes...';
}

const addNote = function(title, body) {
    const notes = loadNotes();
    // https://www.w3schools.com/jsref/jsref_filter.asp
    // Checks if array contains a note with the specified title
    const duplicateNotes = notes.filter(
        function(note) {
            return note.title === title;
        }    
    );

    if(duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log('New note added.');
    } else {
        console.log('Note already exists.');
    }
}

const removeNote = function(title) {
    // Challenge
    // 1) Load existing notes
    const notes = loadNotes();
    // 2) Use array filter method to remove matching note
    const notesToKeep = notes.filter(
        function(note) {
            return note.title !== title;
        }
    );
    // 3) Save newly-created array
    saveNotes(notesToKeep);

    // Challenge: Use chalk to provide useful logs to remove
    if(notes.length > notesToKeep.length)
        console.log(chalk.green.inverse('Note removed!'));    
    else
        console.log(chalk.red.inverse('No note found!'));
}

const saveNotes = function(notes) {
    const noteJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', noteJSON);
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);        
    } catch(e) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}