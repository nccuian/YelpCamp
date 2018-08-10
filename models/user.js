var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    avatar: {type: String, default: 'https://images.unsplash.com/photo-1501869150797-9bbb64f782fd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3e71738b3c6d1eb04d3ef72c070627a1&auto=format&fit=crop&w=934&q=80'},
    age: {type: String, default: '20'},
    email: String
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema)