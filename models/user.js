const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    gender: {type: String, required: true, enum: ["male", "female", "other"]},
    year: {type: String, required: true, enum: ["first", "second", "third", "fourth", "other"]},
    section: {type: String, required: true},
    role: {type: String,required: true, enum: ["user", "admin"], default: "user"},
    notifications: [{
        header: {type: String},
        message: {type: String},
        type: {type: String}, 
        timeStamp: {type: Date},
        gameId: {type: String}
    }],
    gamesPlayed: [{
        gameId: String,
        targets: [String],
        eliminated: Number,
        isActive: Boolean,
        isWinner: Boolean
    }],
    statistics: {
        gamesPlayed: Number,
        gamesWon: Number,
        eliminations: Number
    }
}, {collection: "Users"});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);