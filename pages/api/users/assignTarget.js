import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");

export default async function handler(req, res){
    const { gameId, matches } = req.body;

    try {
        await dbConnect();

        for (var i=0; i<matches.length; i++) {
            var userName = matches[i].userName;
            var targets = [matches[(i+1)%matches.length].userName];
            var u;

            try {
                u = await User.findOne({userName: userName});
            } catch(err) {
                return res.status(500).json({message: err.message});
            }

            var game = {
                gameId: gameId,
                targets: targets,
                eliminated: 0,
                isActive: true,
                isWinner: false
            }

            try {
                u.gamesPlayed.push(game);
                const updatedUser = await u.save();
            } catch(err) {
                return res.status(400).json({message: err.message});
            }
        }

        // const result = await PlayerStatus.insertMany(players);
        // User.updateMany({userName: {$in: names}}, {$push: {gamesPlayed: {
        //     gameId: gameId,
        //     targets: [matches[(matches.find(userName)+1)%matches.length].userName],
        //     eliminated: 0,
        //     isActive: true,
        //     isWinner: false
        // }}});
        // // console.log(result);
        res.status(201).json("Successfully assigned targets");
    } catch (err) {
        res.status(500).json({message: err});
    }
}