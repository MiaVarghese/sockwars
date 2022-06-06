const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    gameNo: Number,
    activePlayers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    eliminatedPlayers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    startDate: Date,
    endDate: Date,
    immunities: [String],
}, {collection: "Games"});

module.exports = mongoose.models.Game || mongoose.model("Game", gameSchema);