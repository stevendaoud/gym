const express  = require('express');
const app  = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user')
const router = express.Router();

mongoose.connect('mongodb://localhost/loginapp');
const db = mongoose.connection;

module.exports = (app)=> {
    
    router.get("/", function(req, res) {
        res.render('home', {user : req.user})
    });

    // Endpoint to get current user
    router.get('/user', function(req, res){
        res.send(req.user);
    });

    router.get('/login', function(req, res){
        req.user ? res.redirect("/profile") : res.render('login', {});
    });

    router.get('/register', function(req, res){
        req.user ? res.redirect("/profile") : res.render('register', {});
    })


    // Endpoint to logout
    router.get('/logout', function(req, res){
        req.logout();
        res.redirect("/");
    });

    router.get('/profile', function(req, res){
        console.log(req.user);
        res.render('profile', {user: req.user});
    });


    

    router.post('/register', function(req, res){
        const password = req.body.password;
        const password2 = req.body.password2;

        User.validateUser(req.body, function(message){
        
            if(message.errors > 0){
                res.status(500).send(message).end()
            }else{
            
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                });

                User.createUser(newUser, function(err, user){
                    if(err) throw err;
                    res.send(user).end()
                });
            }
        });
    });
    
    router.post('/login', passport.authenticate('local'),
        function(req, res) {
           // res.json(req.user);

            res.redirect('/profile');
        }
    );


    router.get('*', function(req, res){
        console.log(req.user);
        res.render('home', {user: req.user});
    });
    return router;
}