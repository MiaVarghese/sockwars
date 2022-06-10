import dbConnect from '../../../lib/dbConnect';
const User = require("../../../models/user");

export default async function handler(req, res){
    const { userName } = req.query;

    try {
        await dbConnect();
        const user = await User.findOne({userName: userName});
        res.json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}