//establish GET, POST, and DELETE routes. Don't forget to establish const for router and db store first

const router = require("express").Router();
const store = require("../db/store");

//GET route
router.get("/notes", (req, res) => {
    store
    .getNotes()
    .then((notes) => {
        return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

//POST route
router.post("/notes", (req, res) => {
    store
    .addNote(req.body)
    .then((notes) => {
        res.json(note)
    })
    .catch((err) => res.status(500).json(err));
});

//DELETE route

module.exports = router;