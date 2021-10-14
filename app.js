require("dotenv/config");

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, () => console.log("Connected to db!"));

//Home page
app.get('/', (req, res) => {
    res.send("<html> <body><h1> Home Page <p>Hello there welcome to our JokeAPI </p></h1></body></html>");

})

//Import routes
const categoriesRoute = require("./routes/categories");
const jokesRoute = require("./routes/jokes");

//Middlewares
app.use(express.json());
app.use("/categories", categoriesRoute);
app.use("/jokes", jokesRoute);


app.listen(port, () => console.log(`server started on port ${port}!`));