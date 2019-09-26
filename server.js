const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const db = require('./connect');
const routes = require("./router/routes");
const passportConfig = require("./passportConfig")(passport);
const router = express.Router();
const PORT = process.env.PORT || 8080;
const app = express();

app.locals.copyright = '2019'

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 24*60*60*1000 },
  //store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
app.engine("handlebars", exphbs({ 
    defaultLayout: "main"
    // ,helpers: {
    //     copyrightYear: function() {

    //        return router.get("/", function(req, res) {
    //             console.log    
    //         return req.user;
    //            // res.render('home', {user : req.user})
    //         });
    //     }
    // }
}));
app.set("view engine", "handlebars");



app.use(routes(app, passport, express));

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
