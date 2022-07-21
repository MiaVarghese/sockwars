const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: String,
    status: String,
    activePlayers: [{ userName: String, section: String, eliminated: Number, friends: [{userName: String, firstName: String, lastName: String, section: String}] }],
    eliminatedPlayers: [
      { id: String, username: String, section: String, eliminator: String },
    ],
    startDate: Date,
    immunities: [String],
    winner: String,
  },
  { collection: "Games" }
);

module.exports = mongoose.models.Game || mongoose.model("Game", gameSchema);
