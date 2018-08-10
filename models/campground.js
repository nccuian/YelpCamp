var mongoose = require("mongoose");
// var Comment = require("./models/comment")

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    createdAt: {type: Date, default: Date.now},
    author: {
        id:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
        username: String,
        avatar: String
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}]
});
module.exports = mongoose.model("Campground", campgroundSchema);