const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require('cors');
const users1 = require("./routes/api/users");

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch((err) => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);
//console.log(users);
app.use("/api/users", users1);

app.get("/", (req, res) => {
    res.send("hello");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server up and running on port ${port}!`);
});