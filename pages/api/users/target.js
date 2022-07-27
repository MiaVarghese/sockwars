import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");

import jwt from 'jsonwebtoken';

export default async function handler(req, res){
    try {
        await dbConnect();
        const { cookies } = req;
        const token = cookies.token;

        if (!token) {
            throw Error("No token found");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const game = await User.findOne({
            _id: decoded.id,
            gamesPlayed: {
                $elemMatch: {gameId: req.query.gameId}
            }
        }, 
        {"gamesPlayed.$": 1});
        console.log(game);

        res.json(game);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}