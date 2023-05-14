const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = apirouter();
const htmlRoutes = htmlrouter();

function apirouter() {
    const router = express.Router();
    const { createnotes, deletenote } = require('Develop/public/assets/js/notes.js');
    let { notesarray } = require('Develop/db/db.json');

    router.get('/notes', (req, res) => {
        res.json(notesarray);
    });

    router.post('/notes', (req, res) => {
        if (notesarray) {
            req.body.id = notesarray.length.toString();
        } else { req.body.id = 0 }
        res.json(createnotes(req.body, notesarray));
    });

    router.delete('/notes/:id', async (req, res) => {
        const { id } = req.params
        notesarray = await deletenote(id, notesarray);
        res.json(notesarray);
    });

}

function htmlrouter() {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
    });

    router.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
    });

    router.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
    });

    return router;
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});