import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");

export default async function handler(req, res){
    const { userName, id } = req.body;

    try {
        await dbConnect();

        const results = await User.updateOne({userName: userName}, {$pull: {notifications: {_id: id}}});
        res.status(201).json(results);
    } catch (err) {
        res.status(500).json({message: err});
    }
}