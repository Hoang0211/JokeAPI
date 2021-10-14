const mongoose = require("mongoose");

const JokeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    }
    
})

module.exports = mongoose.model("Joke", JokeSchema);