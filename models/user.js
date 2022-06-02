const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    gender: String,
    year: String,
    section: String,
}, {collection: "Users"});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);