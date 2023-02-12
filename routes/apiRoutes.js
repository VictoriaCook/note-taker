const path = require('path');
const router = require('express').Router();
const dbReader = require('../helpers/fsUtils');

router.get('/notes', (req, res) => {
    dbReader.getData()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.status(500).json(err));
    });

router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: Math.floor(Math.random() * 1000000),
        };
        dbReader.writeData(newNote).then((data) => {
            return res.json(data)
        })
    } else {
        res.error('Error in adding note');
    }
});

// insert delete route here

module.exports = router;