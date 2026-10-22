import User from "../model/user.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const registerUser = async (req,res)=>{
    try {
        const{name,email,password} = req.body
        if (!name || !email || !password) {
        return res.status(400).json({ message: "Sabhi fields bharna zaroori hai!" });
        }    

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({ message: "Yeh email pehle se registered hai!" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
    
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        })
        res.status(201).json({
            message:"user successfully register ho gya",
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
            }
        })
    } catch (error) {
        console.error("Register error:", error);
    res.status(500).json({ message: "Server error aayi", error: error.message });
    }
}

export const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({message:"email aur password dono bhero"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"galat email hai"})
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({ message: "Galat email ya password!" });
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn:"5d"}
        )
        res.status(200).json({
            message:"Login successfully",
            token,
            user:{
                 id:user._id,
                name:user.name,
                email:user.email
            }
        })
    } catch (error) {
        console.error("Login error",error)
        res.status(500).json({message:"server error",error:error.message})
    }
}