const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const { createnotes, deletenote } = require(`./Develop/public/assets/js/notes.js`);
let { notesarray } = require('./Develop/db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.json(notesarray);
});

app.post('/notes', (req, res) => {
    if (notesarray) {
        req.body.id = notesarray.length.toString();
    } else { req.body.id = 0 }
    res.json(createnotes(req.body, notesarray));
});

app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params
    notesarray = await deletenote(id, notesarray);
    res.json(notesarray);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `./Develop/public/index.html`));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, `./Develop/public/notes.html`));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `./Develop/public/index.html`));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

module.exports = app;
