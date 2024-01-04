import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true})

const Blogs =  new mongoose.model("blogs",schema);
export default Blogs;