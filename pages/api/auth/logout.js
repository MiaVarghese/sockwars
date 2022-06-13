import dbConnect from '../../../lib/dbConnect'
import { serialize } from "cookie";

export default async function handler(req, res){
    try {
        await dbConnect();

        const serialised = serialize("token", "mytoken", {
            httpOnly: true,
            sameSite: "strict",
            maxAge: -1,
            path: "/",
        });

        res.setHeader("Set-Cookie", serialised);

        res.status(200).json("Successfully signed out");
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}