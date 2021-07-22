// =======
// IMPORTS
// =======
const express = require('express');
const fs = require('fs');
const app = express();

// =========
// FUNCTIONS
// =========
const UUID = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

// ======
// ROUTES
// ======

// GET Route for receiving notes
app.get('/', (req, res) => {
    // Log to server
    console.info(`${req.method} for notes data received.`);

    // Read from database and return
    const dbData = JSON.parse(fs.readFileSync('./db/db.json'));
    res.json(dbData);
});

// POST Route for adding notes
app.post('/', (req, res) => {
    // Log to server
    console.info(`${req.method} for adding note data received.`);

    // Read from database, append req, return req
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: UUID()
        };

        // read and write
        let dbData = JSON.parse(fs.readFileSync('./db/db.json'));
        dbData.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(dbData, null, 4), (err) => {
            err ? console.error(err) : console.info('\nData written to db.json')
        });

        const response = {
            status: 'success',
            body: newNote
        };

        res.json(response);

    } else {
        res.json('Uh oh oopsies! Error in posting note.')
    }
});

// DELETE Route for deleting a route
app.delete('/:id', (req, res) => {
    // Log to server
    console.info(`${req.method} for deleting note data received.`);

    // Read from database, delete corresponding note, return req
    const id = req.params.id;
    let data = JSON.parse(fs.readFileSync('./db/db.json'));

    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            data.splice(i, 1);
        };
    };

    fs.writeFile('./db/db.json', JSON.stringify(data, null, 4), (err) => {
        err ? console.error(err) : console.info('\nData deleted from db.json')
    });

    const response = {
        status: 'success',
        body: id
    };

    res.json(response);
});

// ======
// EXPORT
// ======
module.exports = app;