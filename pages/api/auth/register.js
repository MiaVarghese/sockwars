import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");

import jwt from 'jsonwebtoken';

export default async function handler(req, res){
    const user = new User({
        userName: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        year: req.body.year,
        section: req.body.section,
    });

    const name = req.body.username;

    try {
        await dbConnect();
        var u = await User.findOne({userName: name});

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