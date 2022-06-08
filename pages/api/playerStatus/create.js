import dbConnect from '../../../lib/dbConnect'
const Player = require("../../../models/player");

export default async function handler(req, res){
    const { gameId, matches } = req.body;

    try {
        const players = [];
        await dbConnect();

        for (var i=0; i<matches.length; i++) {
            var userName = matches[i].userName;
            var targets = [matches[(i+1)%matches.length].userName];

            const player = new Player({
                userName: userName,
                gameId: gameId,
                targets: targets,
                eliminated: 0,
                isActive: true,
                isWinner: false
            });

            players.push(player);
        }

        const result = await PlayerStatus.insertMany(players);
        console.log(result);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}