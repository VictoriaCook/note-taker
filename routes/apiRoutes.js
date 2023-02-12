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
        res.error('Error in saving new note');
    }
});

router.delete('/notes/:id', (req, res) => {
    var id = req.params.id;
    dbReader.getData()
    .then((parsedData) => {
        for (var i = 0; i < parsedData.length; i++) {
            if (parsedData[i].id == id) {
                parsedData.splice(i, 1)
                console.log(parsedData);
                dbReader.write(parsedData);
                return res.json(true);
            }
        }
        return res.status(404).json(false);
    })  
});

module.exports = router;