import dbConnect from "../../../lib/dbConnect";

import jwt from "jsonwebtoken";

const Game = require("../../../models/game");

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { cookies } = req;
    const token = cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const game = await Game.findOne({ _id: decoded.id });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
