import dbConnect from '../../../lib/dbConnect'
const Game = require("../../../models/game");

export default async function handler(req, res){
    try {
        await dbConnect();
        const { gameNo, activePlayers, eliminatedPlayers, startDate, endDate, immunities } = req.body;
        const sDate = new Date(startDate) //convert the date strings into Date object
        const eDate = new Date(endDate)
        const game = new Game({
            gameNo: gameNo,
            activePlayers: activePlayers,
            eliminatedPlayers: eliminatedPlayers,
            startDate: sDate,
            endDate: eDate,
            immunities:
        })
        try {
            const newGame = await game.save()
            res.status(201).json(game)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}