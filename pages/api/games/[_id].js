// import dbConnect from "../../../lib/dbConnect";
// const Game = require("../../../models/game");

// export default async function handler(req, res) {
//   try {
//     await dbConnect();
//     const games = await Game.find();
//     res.json(games);
//     // res.send("hi");
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

import dbConnect from "../../../lib/dbConnect";
const Game = require("../../../models/game");

export default async function handler(req, res) {
  const { _id } = req.query;
  if(req.method === "GET") {
    try {
      await dbConnect();
      const game = await Game.findOne({ _id: _id });
      res.json(game);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
