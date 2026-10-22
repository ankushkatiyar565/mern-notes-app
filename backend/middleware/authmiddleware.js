import jwt from "jsonwebtoken";
import User from "../model/user.js";


export const protect = async (req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select("-password")
            next()
        } catch (error) {
            console.error("Token verification failed:", error);
             return res.status(401).json({ message: "Token galat hai ya expire ho gaya!" });
        }
    }
    if (!token) {
    return res.status(401).json({ message: "Koi token nahi mila, access denied!" });
  }
}