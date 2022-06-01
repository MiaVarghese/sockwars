import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({message: "Authorization denied"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch(err) {
        res.status(400).json({message: "Token is not valid"});
    }
}