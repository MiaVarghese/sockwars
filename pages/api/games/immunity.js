import dbConnect from "../../../lib/dbConnect";

const Game = require("../../../models/game");

export default async function handler(req, res) {
    try{
        await dbConnect();
        let game = await Game.findOne({_id:req.body.id});
        let immunities = game.immunities;
        
        res.json(immunities)
    }

    catch(err){
        res.status(500).json({ message: err.message });
    }
}