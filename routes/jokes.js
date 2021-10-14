const express = require("express");
const Category = require("../models/Category");
const Joke = require("../models/Joke");
const router = express.Router();

// Get all jokes
router.get("/", async (req, res) => {
    try {
        const jokes = await Joke.find();
        res.json(jokes);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get a random joke from all jokes in database
router.get("/random", async (req, res) => {
    try {
        const jokes = await Joke.find();
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        res.json(randomJoke);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get a joke from jokeId
router.get("/:jokeId", async (req, res) => {
    try {
        const joke = await Joke.findById(req.params.jokeId);
        res.json(joke);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Give a joke a like or dislike
router.patch('/:jokeId/favor/:favor', async (req, res) => {
    try {
        let joke = await Joke.findById(req.params.jokeId);
        if (joke == null) {
            return res.status(404).json({ message: 'Cannot find joke' })
        }

        if (req.params.favor === "like") {
            joke.like++;
        }
        else if (req.params.favor === "dislike") {
            joke.dislike++;
        }
        else {
            return res.status(404).json({ message: 'Cannot find favor' })
        }

        const updateJoke = await joke.save();
        res.json(updateJoke);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})


// Delete all (for developing)
router.delete('/', async (req, res) => {
    try {
        await Joke.deleteMany();
        res.json({ message: 'Deleted All Jokes' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;