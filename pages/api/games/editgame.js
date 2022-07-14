import dbConnect from "../../../lib/dbConnect";
const User = require("../../../models/user");
const Game = require("../../../models/game");

export default async function editgame(req, res) {
  const { _id, activePlayers, eliminatedPlayers, startDate, endDate, immunities } = req.body;
  if(req.method === "PATCH") {
    try {
      await dbConnect();
      const sDate = new Date(startDate) //convert the date strings into Date object
      const eDate = new Date(endDate)
      const update = {
        activePlayers: activePlayers,
        eliminatedPlayers: eliminatedPlayers,
        startDate: sDate,
        endDate: eDate,
        immunities: immunities
      }
      const game = await Game.updateOne(
        { _id: _id },
        { $set: { ...update } }
      );
      res.json(game);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}