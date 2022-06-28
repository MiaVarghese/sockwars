import dbConnect from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";
const User = require("../../../models/user");
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      await dbConnect();
      const { cookies } = req;
      const { newPassword, oldPassword } = req.body;

      // Decode token
      const token = cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Get the user using the decoded token
      const user = await User.findOne({ _id: decoded.id });

      if (!user) {
        throw Error("User does not exist"); // If there is no user found, throw an error
      }

      const matchPasswords = await bcrypt.compare(oldPassword, user.password);

      if (!matchPasswords) {
        throw Error("Incorrect password"); // If old password user inputted is not the same as the users password, throw an error
      }

      // Generate salt for hashing the new password
      const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT));
      if (!salt) {
        throw Error("Something went wrong with bcrypt");
      }

      // Hash the new password
      const hashedPw = await bcrypt.hash(newPassword, salt);
      if (!hashedPw) {
        throw Error("Something went wrong with password hashing");
      }

      // Update the user database object
      await User.updateOne(
        { _id: decoded.id },
        { $set: { password: hashedPw } }
      );

      // Return with status of 200 (success)
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    return res.status(400).json({ message: "Unsupported request method" });
  }
}