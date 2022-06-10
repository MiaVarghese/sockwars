import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");

export default async function handler(req, res){
    const { gameId, matches } = req.body;

    try {
        // const players = [];
        const names = [];
        console.log("here");
        var targets = [matches[(i+1)%matches.length].userName];
        var game = {
            gameId: gameId,
            targets: targets,
            eliminated: 0,
            isActive: true,
            isWinner: false
        }

        for (var i=0; i<matches.length; i++) {
            names.push(matches[i].userName);
        }
        await dbConnect();

        // for (var i=0; i<matches.length; i++) {
        //     var userName = matches[i].userName;
        //     var targets = [matches[(i+1)%matches.length].userName];

        //     const player = new Player({
        //         userName: userName,
        //         gameId: gameId,
        //         targets: targets,
        //         eliminated: 0,
        //         isActive: true,
        //         isWinner: false
        //     });

        //     players.push(player);
        // }

        // const result = await PlayerStatus.insertMany(players);
        // User.updateMany({userName: {$in: names}}, {$push: {gamesPlayed: {
        //     gameId: gameId,
        //     targets: [matches[(matches.find(userName)+1)%matches.length].userName],
        //     eliminated: 0,
        //     isActive: true,
        //     isWinner: false
        // }}});
        // // console.log(result);
        // res.status(201).json(result);
    } catch (err) {
        res.status(500).json({message: err});
    }
}