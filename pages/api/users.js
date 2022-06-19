import dbConnect from "../../lib/dbConnect";
const User = require("../../models/user");

export default async function handler(req, res) {
  try {
    await dbConnect();
    const users = await User.find();
    res.json(users);
    // res.send("hi");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
