import dbConnect from "../../../lib/dbConnect";
const Game = require("../../../models/game");

export default async function handler(req, res) {
  try {
    await dbConnect();
    var result = [];

    const games = await Game.find().sort({startDate: -1});
    var prev;
    var curr;
    var next;

    for (var i=0; i<games.length; i++) {
      if (games[i].startDate<new Date() && games[i].status!="ended") {
        curr = games[i];
        if (i<games.length-1 && games[i+1].startDate>new Date()) {
          next = (games[i+1]);
        }
        if (i>0 && games[i-1].status==="ended") {
          prev = games[i-1];
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

    res.json({prev: prev, curr: curr, next: next});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
