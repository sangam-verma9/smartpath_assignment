const express = require("express");
const bodyParser = require("body-parser");
const cookiep = require("cookie-parser");
const errormiddleware = require("./middlewares/error");

const app = express();

app.use(errormiddleware);
app.use(express.json());
app.use(cookiep());
app.use(bodyParser.json());

// Home route test purpose
app.get("/", (req, res) => {
    res.send("Welcome to the Smartpath Backend API!");
})

const course = require("./routes/courseRoute");
const quiz = require("./routes/quizRoute");
const user=require("./routes/userRoute");

app.use("/api/v1", course);
app.use("/api/v1", quiz);
app.use("/api/v1",user);

module.exports = app;