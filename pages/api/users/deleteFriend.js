import dbConnect from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";
const User = require("../../../models/user");

export default async function handler(req, res) {
    try {
        await dbConnect();
        const { cookies } = req;
        const token = cookies.token;
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const response = await User.updateOne({_id: decoded.id}, {$pull: {friends: {userName: req.body.friend}}});
        const user = await User.findOne({_id: decoded.id});

        res.status(201).json(user.friends);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}