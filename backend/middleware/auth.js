import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const auth = async (req,res,next)=>{

    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"Authorization token required"})
    }
   
    const token = authorization.split(' ')[1];
    try{
        const {_id} =jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findOne({_id}).select('_id');
        next();
    }catch(error){
        res.status(401).json({
            error:"request is not authorized"
        })
    }
}
/*
if(!authorization){
    return res.status(401).json({
        error:"authorization required"
    })
}
const token = authorization.split(' ')[1];
try{
const {_id} = jwt.verify(token,process.env.SECRET);
req.user = await User.findOne({_id}).select('_id');
next();

}catch(error){
    return res.status(400).json({
        error:"request is not authorized"
    })
}

*/
export default auth;