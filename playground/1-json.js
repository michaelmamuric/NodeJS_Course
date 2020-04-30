const fs = require('fs');

/*
const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday'
};

const bookJSON = JSON.stringify(book);
fs.writeFileSync('1-json.json', bookJSON);
*/

/*
const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
console.log(data.title);
*/

// Challenge
const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
// Write new data
data.name = 'Michael';
data.age = 26;
fs.writeFileSync('1-json.json', JSON.stringify(data));
