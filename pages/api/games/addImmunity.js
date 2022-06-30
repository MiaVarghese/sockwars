import dbConnect from "../../../lib/dbConnect";
const Game = require("../../../models/game");

export default async function handler(req, res) {
  const { _id, immunity } = req.body;
  if(req.method === "PATCH") {
    try {
      await dbConnect();
      await Game.updateOne(
        { _id: _id },
        { $push: {"immunities": immunity}}
      )
      res.status(201).json("Successfully added immunity");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}