const express = require("express");
const Category = require("../models/Category");
const Joke = require("../models/Joke");
const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all jokes from a category
router.get("/:categoryName", async (req, res) => {
    try {
        const category = await Category.findOne({ name: req.params.categoryName }).populate('jokes');
        if (category == null) {
            return res.status(404).json({ message: 'Cannot find category' })
        }

        res.json(category.jokes)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a random joke from a category
router.get("/:categoryName/random", async (req, res) => {
    try {
        const category = await Category.findOne({ name: req.params.categoryName }).populate('jokes');
        if (category == null) {
            return res.status(404).json({ message: 'Cannot find category' });
        }

        const randomJoke = category.jokes[Math.floor(Math.random() * category.jokes.length)];
        res.json(randomJoke);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new category
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name
    })
    try {
        const newCategory = await category.save()
        res.status(201).json(newCategory)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Create a new joke in a category
router.post('/:categoryName', async (req, res) => {
    let category = await Category.findOne({ name: req.params.categoryName });
    if (category == null) {
        return res.status(404).json({ message: 'Cannot find category' })
    }

    const joke = new Joke({
        name: req.body.name,
        content: req.body.content,
        categories: category._id
    })

    try {
        const newJoke = await joke.save();
        res.status(201).json(newJoke);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Add an existing joke to a category by joke id
router.patch('/:categoryName/:jokeId', async (req, res) => {
    try {
        let category = await Category.findOne({ name: req.params.categoryName });
        if (category == null) {
            return res.status(404).json({ message: 'Cannot find category' })
        }

        let joke = await Joke.findById(req.params.jokeId);
        if (joke == null) {
            return res.status(404).json({ message: 'Cannot find joke' })
        }

        joke.categories.push(category._id);
        const updateJoke = await joke.save();
        res.json(updateJoke);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})


module.exports = router;