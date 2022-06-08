const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameNo: {
    type: String,
    required: true,
  },

  activePlayers: {
    type: [String],
    required: true,
  },
  eliminatedPlayers: {
    type: [String],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  Immunities: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Game", gameSchema);
Game = mongoose.models.Game;
