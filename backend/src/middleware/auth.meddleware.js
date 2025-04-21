import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message: "Unauthorized- no token"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({message: "Unauthorized- no user"})
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("error in protect route middleware", error);
        res.status(500).json({message: "Internal server error"})
    }
}