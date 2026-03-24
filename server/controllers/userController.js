import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

// Signup a new user
export const signup = async (req, res) => {
    const { email, fullName, password, bio } = req.body;

    try {
        if (!email || !fullName || !password || !bio) {
            return res.json({success: false, message: "Missing Details"})
        }
        const user = await User.findOne({email});
        if (user) {
            return res.json({success: false, message: "Account already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            fullName,
            password: hashedPassword,
            bio
        });

        const token = generateToken(newUser._id)

        res.json({success: true, message: "Account created successfully", userData: newUser});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Controller to login a user
export const login = async (req, res) => {
    try {
         const { email, password } = req.body;
         const userData = await User.findOne({email})

         const isPasswordCorrect = await bcrypt.compare(password, userData.password);
         if(!isPasswordCorrect){
            return res.json({success: false, message: "Invalid Credentials"});
         }
       
          const token = generateToken(userData._id)

        res.json({success: true, message: "Login successful", userData: userData, token: token});

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

//Controller to check if user is authenticated
export const checkAuth = (req, res) => {
    res.json({success:true, user: req.user});
}

//Controller to update profile details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic , fullName, bio } = req.body;


        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {fullName, bio}, {new: true});
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {fullName, bio, profilePic: upload.secure_url}, {new: true});
        }

        res.json({success: true, user: updatedUser})
    } catch (error){
    console.log(error.message);
    res.json({success: false, message: error.message})        
    }
}