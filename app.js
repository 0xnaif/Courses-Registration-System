const express = require("express");
const mongoose = require("mongoose");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const router = require("./routes/router")
let app = express();

app.set('view engine', 'ejs');
app.use(express.static('views/css'));
app.use(express.static('views/images'));
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));
app.use(express.urlencoded({extended: true}));
app.use(sessions({
    secret: "ThisIsMySecretKey",
    resave: true,
    saveUninitialized: true,
}));
app.use(cookieParser());
 
mongoose.connect('mongodb://127.0.0.1:27017/Registration_System');

app.use("/", router);

app.listen(3000, () => {
    console.log("listen  directed!")
})