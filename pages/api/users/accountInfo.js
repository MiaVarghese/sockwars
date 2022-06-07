import dbConnect from '../../../lib/dbConnect'
import auth from "../../../middleware/auth";

import jwt from "jsonwebtoken";

const User = require("../../../models/user");

export default async function handler(req, res){
    // const token = req.headers["authorization"];
    // var userID = "";

    // if (!token) {
    //     return res.status(401).json({message: "Authorization denied"});
    // }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //     userID = decoded.id;
    // } catch(err) {
    //     res.status(400).json({message: "Token is not valid"});
    // }

    try {
        await dbConnect();
        const { cookies } = req;
        const token = cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({_id: decoded.id});
        res.json(user);
        // res.send("hi");
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}