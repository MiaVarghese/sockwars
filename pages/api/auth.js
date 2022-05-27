import dbConnect from '../../lib/dbConnect'
const User = require("../../models/user");

import jwt from 'jsonwebtoken';

export default async function handler(req, res){
    try {
        await dbConnect();
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            throw Error("User does not exist");
        } else if (!(password==user.password)) {
            throw Error("Invalid credentials");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        if (!token) {
            throw Error("Couldn't sign token");
        }

        res.status(200).json({token, user});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}