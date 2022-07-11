import dbConnect from "../../../lib/dbConnect";
const Game = require("../../../models/game");

export default async function handler(req, res) {
  try {
    await dbConnect();
    var result = [];

    const games = await Game.find().sort({startDate: -1});
    // const recent = games[games.length-1];

    for (var i=0; i<games.length; i++) {
      if (games[i].status=="ongoing") {
        result.push(games[i]);
        if (i<games.length-1 && games[i+1].status=="pending") {
          result.push(games[i+1]);
        }
        break;
      }
    }

    // if (recent.startDate <= new Date() && recent.endDate >= new Date()) {
    //     result.push(recent);
    // } else if (games[games.length-2].startDate <= new Date() && games[games.length-2].status == "ongoing") {
    //     result.push(games[games.length-2]);
    //     result.push(recent);
    // }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
