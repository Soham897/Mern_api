import { usermodel } from "../Models/User.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const userRegister = async (req,res)=>{
    
   const {name,email,password} = req.body;

   if(name == "" || email == ""|| password == ""){
        return res.json({message:"All fields are required",success:false})
   }
   let user = await usermodel.findOne({email});
   if(user){
    return res.json({message:"User email is already registerd",success:false})
   }

    const hashpass = await bcrypt.hash(password,10);

   user = await usermodel.create({name,email,password:hashpass})

   const token = jwt.sign({userId:user._id},process.env.JWT)

   if(user){
        res.cookie("token",token,{httpOnly:true,maxAge:10*60*1000,sameSite:process.env.NODE_ENV === "Develpoment" ? "lax" :"none",secure:process.env.NODE_ENV === "Develpoment" ? false :true}).json({message:"User created successfully",user,success:true})
   }
   else{
        res.json({message:"User could not create",success:false})
   }

}
export const userLogin = async (req,res)=>{
    // const {email,password} = req.body;
    const {email,password} = req.body;


    if(email == "" || password == ""){
        return res.json({message:"All fields are required",success:false})
    }

    let user = await usermodel.findOne({email});

    if(!user){
        return res.json({message:"User not exist",success:false})
    }
    let valid = await bcrypt.compare(password,user.password);

    if(!valid){
        return res.json({message:"Password is incorrect",success:false})
    }
    const token = await jwt.sign({userId:user._id},process.env.JWT)

    res.cookie("token",token,{httpOnly:true,maxAge:10*60*1000,sameSite:process.env.NODE_ENV === "Develpoment" ? "lax" :"none",secure:process.env.NODE_ENV === "Develpoment" ? false :true}).json({message:`Welcome ${user.name}`,success:true})
}
export const userLogout = async (req,res)=>{
    res.cookie("token","",{expires:new Date(Date.now())}).json({success:true,message:"LogOut successfully"})
}

export const userProfile = async (req,res)=>{
    
    res.json({user:req.User})
   
}