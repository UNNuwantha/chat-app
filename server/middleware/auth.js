import User from "../models/User.js";
import jwt from "jsonwebtoken";


//Middleware to protect routes
export const protectRoute = async (req, res, next) =>{
     try {
        const rawToken = req.headers.authorization || req.headers.token;
        const token = rawToken?.startsWith('Bearer ') ? rawToken.split(' ')[1] : rawToken;

        if(!token){
            return res.status(401).json({success:false, message:"jwt must be provided"});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            return res.status(404).json({success: false, message: "User not found" });
        }
        req.user = user;
        next();
     } catch (error) {
            console.log(error.message);
        return res.status(401).json({success: false, message: error.message});
     }
}