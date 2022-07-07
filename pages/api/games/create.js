import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");
const Game = require("../../../models/game");

export default async function handler(req, res){
    try {
        // console.log(req.body)
        await dbConnect();
        //console.log(req.body)
        const { activePlayers, eliminatedPlayers, startDate, endDate, immunities } = req.body;
        const sDate = new Date(startDate) //convert the date strings into Date object
        const eDate = new Date(endDate)
        const game = new Game({
            status: "pending",
            activePlayers: activePlayers,
            eliminatedPlayers: eliminatedPlayers,
            startDate: sDate,
            endDate: eDate,
            immunities: immunities
        })
        try {
            const newGame = await game.save()
            /*console.log(typeof(game._id))
            const updated = await User.updateMany(
                {},
                { $push: {"gamesPlayed": {
                    gameId: game._id.toString(),
                    targets: [],
                    eliminated: 0,
                    isActive: true,
                    isWinner: false
                }}}
            )*/
            res.status(201).json(game)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}