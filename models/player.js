const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true
    },
    gameId: {
        type: Number, 
        required: true
    },
    targets: [String],
    eliminated: {
        type: Number, 
        required: true,
        default: 0
    },
    isActive: {
        type: Boolean, 
        required: true,
        default: true
    },
    isWinner: {
        type: Boolean, 
        required: true,
        default: false
    },
}, {collection: "Players"});

module.exports = mongoose.models.Players || mongoose.model("Player", playerSchema);