const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const about = require("./controllers/about.js");
const index = require("./controllers/index.js");
const bodyParser = require("body-parser");
const unitamt = require("./models/unitamt.js");
const post = require("./controllers/post.js");
const postdocs = require("./controllers/postdocs.js");
const finddocs = require("./controllers/finddocs.js");
const register = require("./controllers/register.js");
const storeuser = require("./controllers/storeuser.js");
const login = require("./controllers/login.js");
const loginuser = require("./controllers/loginuser.js");
const expressSession = require("express-session");
const loginlock = require("./middleware/loginlock.js");
const logout = require("./controllers/logout.js");
const flash = require("connect-flash");
const PORT = process.env.PORT || 4000;

const app = new express();
app.use(flash());
app.use(express.static("public"));
app.use(express.static("views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "fag",
  })
);

global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

mongoose.connect("mongodb://localhost/dbforapp", { useNewUrlParser: true });

app.get("/", index);
app.get("/about", about);
app.post("/posts/store", postdocs);
app.get("/post", post);
app.get("/post/:id", finddocs);
app.get("/register", loginlock, register);
app.post("/users/register", loginlock, storeuser);
app.get("/login", loginlock, login);
app.post("/users/login", loginlock, loginuser);
app.get("/logout", logout);
app.use((req, res) => res.render("notfound"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
