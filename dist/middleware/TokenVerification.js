import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const TokenVerification = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
        // return next();
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JSONKEY, (err, decoded) => {
        if (err) {
            return next();
        }
        req.user = decoded;
        // console.log(decoded);
        next();
    });
};
export default TokenVerification;
