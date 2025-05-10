import jwt from 'jsonwebtoken'
import { usermodel } from '../Models/User.js'

export const isauthenticate = async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message:'Login or Register first',success:false})
    }

    const decoded = jwt.verify(token,process.env.JWT);

    const user = await usermodel.findById(decoded.userId);

    if(!user){
        return res.json({message:'user not found',success:false})
    }

    req.User = user;
    next();
}