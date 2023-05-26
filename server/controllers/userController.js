
import user from "../models/userModel.js";
import AsyncHandler from "express-async-handler";

export const getUser=AsyncHandler(async(req,res)=>{
    try {
        const {id}=req.params;
        const finduser = await user.findById(id);
        if(finduser){
            res.status(200).json(finduser);
        }
        else{
            res.status(401);
            throw new Error("User doesnot exist");
        }
    } catch (err) {
        res.status(404).json({message:err.message,
        req:req.body});
    }
});
export const getUserFriends=AsyncHandler(async(req,res)=>{
    try {
        const { id }=req.params;
        const finduser = await user.findById(id);
        const friends=await Promise.all(
            finduser.friends.map((Id)=>user.findById(Id))
            
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );
          res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });

    }
});

export const addRemoveFriend=AsyncHandler(async(req,res)=>{
    try{
        const {id,friendId}=req.params;
        const finduser= await user.findById(id);
        const findFriend=await user.findById(friendId);
        if(finduser.friends.includes(findFriend)){
            //remove that friend
            finduser.friends=finduser.friends.filter((id)=>id!==friendId);
            findFriend.friends=findFriend.friends.filter((Id)=>Id!==id);
        }
        else{
            //add that friend 
            finduser.friends.push(friendId);
            findFriend.friends.push(id);
        }
        await finduser.save();
        await findFriend.save();
        const friends=await Promise.all(
            finduser.friends.map((id)=>findById(id))
            
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
              return { _id, firstName, lastName, occupation, location, picturePath };
            }
          );
          res.status(200).json(formattedFriends);

    }catch(err){
        res.status(404).json({ message: err.message });
    }
});

