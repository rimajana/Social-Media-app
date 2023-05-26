import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

/*Register*/
export const register=asyncHandler(async(req,res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        }=req.body;
        if(!firstName ||!lastName || !email || !password || !location || !occupation){
            res.status(400).json("All fields are not filled");
            throw new Error("All fields are Mandatory");
        }
        //check if email  exists or not
        const userCheck=User.findOne({email});
        // console.log(userCheck);
        if(!userCheck){
            res.status(400).json("email already exist. Try login instead");
            throw new Error("email already exist. Try login instead");
        }
        const hashedPassword=await bcrypt.hash(password,10);
        // console.log(hashedPassword)
        const newUser= await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random()*1000),
            impressions:Math.floor(Math.random()*1000)
        })
        // console.log("usercreated",newUser);
        if(newUser){
            res.status(201).json(newUser);
        }
        else{
            res.status(400);
            throw new Error("user data is not valid");
        }
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

export const login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    //check if empty or not
    try {
        if(!email || !password){
            res.status(400).json({message:"Both fields are mandatory"});
            throw new Error("Both fields are mandatory")
        }
        const userCheck= await User.findOne({email});
        if(userCheck &&(await bcrypt.compare(password,userCheck.password) )){
            //provide accesss token
            const accessToken=Jwt.sign({id:userCheck._id},process.env.ACCESS_TOKEN_SECRET);
            delete userCheck.password;
            // console.log(userCheck);
            const useremail=userCheck.email;
            res.status(200).json({"token":accessToken,"user":userCheck});
    
        }
        else{
            res.status(400).json({message:"Incorrect Email or password"});
            throw new Error("Email or password not valid");
        }
        
        
    } catch (err) {
        res.status(500).json({error:err.message});
    }
    
});