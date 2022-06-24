const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    activePlayers: [{ id: String, userName: String, section: String }],
    eliminatedPlayers: [{ id: String, userName: String, section: String, eliminator: String }],
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    immunities: [String],
    winner: String,
}, {collection: "Games"});

module.exports = mongoose.models.Game || mongoose.model("Game", gameSchema);

