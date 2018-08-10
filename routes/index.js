var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

// landing route
router.get("/", function(req, res){
    res.render("landing")
});

// Auth routes
router.get("/register", function(req, res){
    res.render("register")
});

router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        avatar: req.body.avatar,
        age: req.body.age,
        email: req.body.email
    });
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

//user profiles
router.get("/user/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("err", "No found user");
            res.redirect("/");
        }
        Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
            if(err){
                req.flash("err", "No found user");
                res.redirect("/");
            }
            res.render("user/show", {user: foundUser, campgrounds: campgrounds});
        })
    })
})


module.exports = router;