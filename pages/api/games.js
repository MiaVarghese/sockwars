import dbConnect from '../../lib/dbConnect'
const Game = require("../../models/game");

export default async function handler(req, res){
    try {
        await dbConnect();
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}