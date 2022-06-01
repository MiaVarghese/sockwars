import dbConnect from '../../lib/dbConnect'
const User = require("../../models/user");

import jwt from 'jsonwebtoken';

export default async function handler(req, res){
    const user = new User({
        userName: "user1",
        email: "u@gmail.com",
        password: "pass",
        firstName: "mary",
        lastName: "smith",
        section: "trumpet",
    });

    const { userName } = req.body;

    try {
        await dbConnect();
        var u = await User.findOne({userName: "user1"});
        if (u) {
            res.status(500).json({message: "User already exists"});
        } else {
            const newUser = await user.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
    
            res.status(201).json({token, user});
        }
        // res.send("hi");
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}