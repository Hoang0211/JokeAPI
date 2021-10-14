const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

CategorySchema.virtual('jokes', {
    ref: 'Joke',
    localField: '_id',
    foreignField: 'categories'
})

module.exports = mongoose.model("Category", CategorySchema);