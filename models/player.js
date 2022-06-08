const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    userName: String,
    gameId: Number,
    targets: [String],
    eliminated: Number,
    isActive: Boolean,
    isWinner: Boolean
}, {collection: "Players"});

module.exports = mongoose.models.Players || mongoose.model("Player", playerSchema);