var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    author: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        username: String,
        avatar: String
    },
    createdAt: {type: Date, default: Date.now},
    content: String,
})
module.exports = mongoose.model("Comment", commentSchema)