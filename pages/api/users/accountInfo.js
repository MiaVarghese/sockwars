import dbConnect from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";
const User = require("../../../models/user");

export default async function handler(req, res) {

  if (req.method === "GET") {
    try {
      await dbConnect();
      const { cookies } = req;
      const token = cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user = await User.findOne({ _id: decoded.id });
      res.json(user);
      // res.send("hi");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "PATCH") {
    try {
      await dbConnect();
      const { cookies } = req;
      const token = cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const { userInfo } = req.body;

      const user = await User.updateOne(
        { _id: decoded.id },
        { $set: { ...userInfo } }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    return res.status(400).json({ message: "Unsupported request method" });
  }
}