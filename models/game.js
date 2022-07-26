const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: String,
    status: String,
    activePlayers: [{ 
      userName: String, 
      section: String, 
      eliminated: Number, 
      friends: [{userName: {type: String}, firstName: {type: String}, lastName: {type: String}, section: {type: String}}] 
    }],
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
