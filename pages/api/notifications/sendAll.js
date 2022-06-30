import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");

export default async function handler(req, res){
    const { header, message, type, game } = req.body;

    try {
        await dbConnect();


        const obj = {
            header: header,
            message: message,
            type: type,
            timeStamp: new Date(),
            gameId: game
        }

        const results = await User.updateMany({}, {$push: {notifications: obj}});
        res.status(201).json(results);
    } catch (err) {
        res.status(500).json({message: err});
    }
}