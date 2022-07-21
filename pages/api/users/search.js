import dbConnect from '../../../lib/dbConnect';
const User = require("../../../models/user");

export default async function handler(req, res){
    try {
        await dbConnect();
        const user = await User.find({userName: {$regex: ".*" + req.query.key + ".*", $options: "i"}}, {userName: 1, firstName: 1, lastName: 1, section: 1, _id: 0});
        res.json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}