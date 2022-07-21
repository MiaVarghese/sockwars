import dbConnect from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";
const User = require("../../../models/user");

export default async function handler(req, res) {
    try {
      await dbConnect();
      const { cookies } = req;
      const token = cookies.token;

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await User.findOne({ _id: decoded.id });
      const friend = await User.findOne({userName: req.body.friend});
      const param = {
        userName: friend.userName, 
        firstName: friend.firstName, 
        lastName: friend.lastName,
        section: friend.section
      }
      const response = await User.updateOne({_id: decoded.id}, {$push: {friends: param}});
      // user.friends.push({userName: friend.userName, firstName: friend.firstName, lastName: friend.lastName});
      // await user.save();
      res.json(user);
      // res.send("hi");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}