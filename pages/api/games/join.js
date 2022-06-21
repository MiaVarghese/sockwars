import dbConnect from "../../../lib/dbConnect";
const User = require("../../../models/user");
const Game = require("../../../models/game");

export default async function handler(req, res) {
  const { _id, userString } = req.body;
  if(req.method === "PATCH") {
    try {
      await dbConnect();
      const user = JSON.parse(userString)
      const username = user.userName;
      console.log(typeof(user._id))
      await User.updateOne(
        { userName: username },
        { $push: {"gamesPlayed": {
            gameId: _id,
            targets: [],
            eliminated: 0,
            isActive: true,
            isWinner: false
        }}}
      )
      await Game.updateOne(
        { _id: _id },
        { $push: {"activePlayers": {
            id: user._id,
            userName: username,
            section: user.section
        }}}
      );
      res.status(201).json("Successfully opted into game");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}