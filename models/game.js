const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    activePlayers: [{ id: Number, username: String, section: String }],
    eliminatedPlayers: [{ id: Number, username: String, section: String }],
    startDate: Date,
    endDate: Date,
    immunities: [String],
}, {collection: "Games"});

module.exports = mongoose.models.Game || mongoose.model("Game", gameSchema);