const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegister = require("../../validation/register");
const validateLogin = require("../../validation/login");

const User = require("../../models/User");
const secret = "atreya";

router.get("/register", (req, res) => {
    res.send("THis is register page");
});
router.post("/register", (req, res) => {

    const { error, isValid } = validateRegister(req.body);


    if (!isValid) {

        return res.status(400).json(error);
    }

    User.findOne({
        email: req.body.email,
    }).then((user) => {
        if (user) {
            return req.status(400).json({
                email: "Email already exists",
            });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password1,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    const { error, isValid } = validateLogin(req.body);
    if (!isValid) {
        console.log(error);
        return res.status(400).json(error);
    }

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                };
                jwt.sign(payload, secret, { expiresIn: 31556926 }, (err, token) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                        });
                    }
                });
            } else {
                console.log("here");
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;