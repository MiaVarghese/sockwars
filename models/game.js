const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    activePlayers: [{ userName: String, section: String, eliminated: Number }],
    eliminatedPlayers: [
      { id: String, username: String, section: String, eliminator: String },
    ],
    startDate: Date,
    endDate: Date,
    immunities: [String],
    winner: String,
  },
  { collection: "Games" }
);

module.exports = mongoose.models.Game || mongoose.model("Game", gameSchema);
