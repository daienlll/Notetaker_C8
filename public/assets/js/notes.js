const fs = require('fs');
const path = require('path');

function createnotes(body, notesarray) {
    notesarray.push(body)
    fs.writeFileSync(
        path.join(__dirname, '../../../db/db.json'),
        JSON.stringify({ notesarray }, null, 2)
    );

    return body;
};

function deletenote(id, notes) {
    let notesarray = notes.filter(el => {
        if (el.id == id) {
            return false
        } else {
            return true
        }
    }) 

    let index = 0;
    notesarray.forEach(note => {
        note.id = index;
        index += 1;
    });

    fs.writeFileSync(
        path.join(__dirname, '../../../db/db.json'),
        JSON.stringify({ notesarray }, null, 2)
    );
    return notesarray;
}

module.exports = {
    createnotes,
    deletenote
};