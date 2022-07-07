import dbConnect from "../../lib/dbConnect";
const Game = require("../../models/game");

export default async function handler(req, res) {
  try {
    await dbConnect();
    const games = await Game.find();
    var index = games.length;
    res.json(games)
    // res.send("hi");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// import dbConnect from "../../lib/dbConnect";
// const Game = require("../../models/game");

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
