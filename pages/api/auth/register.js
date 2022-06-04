import dbConnect from '../../../lib/dbConnect'
const User = require("../../../models/user");

import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export default async function handler(req, res){
    const { userName, password } = req.body;

    try {
        await dbConnect();
        var u = await User.findOne({userName});

        if (u) {
            res.status(500).json({message: "User already exists"});
        } else {
            const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT));
            if (!salt) {
                throw Error("Something went wrong with bcrypt");
            }

            const hashedPw = await bcrypt.hash(password, salt);
            if (!hashedPw) {
                throw Error("Something went wrong with password hashing");
            }

            const user = new User(req.body);
            console.log(user.password);
            user.password = hashedPw;
            const newUser = await user.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
    
            res.status(201).json({token, user});
        }
        // res.send("hi");
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}