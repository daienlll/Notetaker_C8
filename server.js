const express = require('express');
const path = require('path');

const {readFromFile, readAndAppend, deletenote} = require ('./helpers/fsutils.js')
const PORT = process.env.PORT || 3001;
const app = express();
var notesarray = require('./db/db.json');
console.log(notesarray)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
    console.log(notesarray)
});

app.get('/api/notes', (req, res) =>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/api/notes', (req, res) => {
    if (notesarray) {
        req.body.id = notesarray.length.toString();
    } else { req.body.id = 0 }
    res.json(readAndAppend(req.body, './db/db.json'));
});

app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params
    const notesarray = await deletenote(id, './db/db.json');
    res.json(notesarray);
});

app.get('/', (req, res) => {
    pathway = path.join(__dirname, './public/index.html')
    console.log(pathway)
    res.sendFile(pathway);
});

// app.get('/notes', (req, res) => {
    
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

module.exports = app;
