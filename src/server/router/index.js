const express = require("express");
const cookieParser = require("cookie-parser");

const router = express();
router.use(cookieParser());

const home = require("./home");
const login = require("./login");
const article = require("./article");

router.get("/", home);
router.get("/login", login);
router.get("/posts/:id", article);

module.exports = router;
