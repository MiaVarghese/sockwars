const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    activePlayers: [{ id: String, username: String, section: String }],
    eliminatedPlayers: [{ id: String, username: String, section: String }],
    startDate: Date,
    endDate: Date,
    immunities: [String],
}, {collection: "Games"});

module.exports = mongoose.models.Game || mongoose.model("Game", gameSchema);