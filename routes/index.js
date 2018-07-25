var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// landing route
router.get("/", function(req, res){
    res.render("landing")
});

// Auth routes
router.get("/register", function(req, res){
    res.render("register")
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        })
    })
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
        // successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true
    }), function(req, res){
            req.flash("success", "Welcome, " + req.user.username);
            res.redirect(req.session.returnTo || "/campgrounds");
            delete req.session.returnTo;
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

// function isLoggedIn(req, res ,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.session.returnTo = req.path;
//     // console.log(req.session)
//     // console.log(req.path)
//     res.redirect("/login")
// }

module.exports = router;