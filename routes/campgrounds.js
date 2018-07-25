var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//index route
router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, AllCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campground/index", {campgrounds:AllCampgrounds})
        }
    })
});

//create route
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
    req.body.campground.author = {
        id: req.user._id,
        username: req.user.username
    };
    Campground.create(req.body.campground, function(err, NewCampground){
        if(err){
            console.log(err);
        } else{
            console.log(NewCampground)
            res.redirect("/campgrounds")
        }
    })
    
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
    res.render("campground/new")
});

//show route
router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else{
            res.render("campground/show", {campground: foundCampground})
        }
    })
});

//edit route
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            console.log(err)
        }else {
            res.render("campground/edit", {campground: foundCampground})
        }
    })
});

router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err) {
            console.log(err)
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});

//destory route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "Campground deleted")
            res.redirect("/campgrounds")
        }
    })
});

module.exports = router;