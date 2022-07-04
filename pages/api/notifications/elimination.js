import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");

export default async function handler(req, res){
    const { userName, targetId, gameId } = req.body;

    try {
        await dbConnect();

        const obj = {
            header: userName,
            message: "has eliminated you",
            type: "elimination",
            timeStamp: new Date(),
            gameId: gameId
        }

        const results = await User.updateOne({_id: targetId}, {$push: {notifications: obj}});
        res.status(201).json(results);
    } catch (err) {
        res.status(500).json({message: err});
    }
}