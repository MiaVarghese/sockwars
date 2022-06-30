import dbConnect from "../../lib/dbConnect";
const Game = require("../../models/game");

export default async function handler(req, res) {
  try {
    await dbConnect();
    const games = await Game.find();
    var index = games.size();
    res.json(games[index - 1]);
    // res.json(games);
    // res.send("hi");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
