import dbConnect from "../../../lib/dbConnect";
const User = require("../../../models/user");
const Game = require("../../../models/game");

export default async function handler(req, res) {
    const { gameId, userName } = req.body;
    try {
        await dbConnect();
        const user = await User.updateOne({userName: userName}, {$pull: {gamesPlayed: {gameId: gameId}}});
        const game = await Game.updateOne({ _id: gameId }, {$pull: {activePlayers: {userName: userName}}});
        res.status(201).json("Successfully opted out of game");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}