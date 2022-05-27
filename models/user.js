const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    section: String,
}, {collection: "Users"});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);