import dbConnect from "../../../lib/dbConnect";
const Game = require("../../../models/game");

export default async function handler(req, res) {
    try{
        await dbConnect();
        let game = await Game.findOne({_id:req.body.id});
        let immunities = game.immunities;
        let currentDate = new Date();

        if (currentDate >= game.startDate && currentDate <= game.endDate){
            let immunityIndex = Math.floor((currentDate - game.startDate) / 1000 / 60 / 60 / 24)
            res.json(immunities[immunityIndex])
        }
        
        else
            res.status(400).json({ message: err.message });
    }

    catch(err){
        res.status(500).json({ message: err.message });
    }
}