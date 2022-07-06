import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");

export default async function handler(req, res){
    const { gameId, matches } = req.body;

    try {
        await dbConnect();

        for (var i=0; i<matches.length; i++) {
            var userName = matches[i].userName;
            var targets = matches[(i+1)%matches.length].userName;

            var u = await User.findOne({userName: userName});

            for (var j=0; j<u.gamesPlayed.length; j++) {
                if (u.gamesPlayed[j].gameId===gameId) {
                    u.gamesPlayed[j].targets.push(targets);
                    const updatedUser = await u.save();
                    break;
                }
            }
        }
        res.status(201).json("Successfully assigned targets");
    } catch (err) {
        res.status(500).json({message: err});
    }
}