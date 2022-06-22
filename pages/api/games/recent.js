import dbConnect from "../../../lib/dbConnect";
const Game = require("../../../models/game");

export default async function handler(req, res) {
  try {
    await dbConnect();
    var result = [];

    const games = await Game.find().sort({startDate: 1});
    const recent = games[games.length-1];
    if (recent.startDate <= new Date() && recent.endDate >= new Date()) {
        result.push(recent);
    } else if (games[games.length-2].startDate <= new Date() && games[games.length-2].endDate >= new Date()) {
        result.push(games[games.length-2]);
        result.push(recent);
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
