//get blogs,create blog, delete blog,update blog
import Blogs from "../models/blogModel.js"
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
export const getBlogs = async (req,res)=>{
try{
    const user_id = req.user._id;

    const blogs = await Blogs.find({user_id}).sort({createdAt:-1});
    res.status(200).json({
        blogs
    })
}catch(error){
    res.status(400).json({
        error:error.message
    })
}

}
export const createBlog = async (req,res)=>{
    const {title,description} = req.body; 
    try {
        if(!title  || !description){
            throw Error("all fields are mandatory");
        }
        const user_id = req.user._id;
        if(!req.file){
            throw Error("photo is mandatory");
        }
        const fileUri = getDataUri(req.file);
        let mycloud=null;
        try {
            mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
        } catch (error) {
            console.error("Cloudinary upload error:", error);
        
            // Return a more informative error response to the client
            return res.status(500).json({
                error: "Error uploading file to Cloudinary",
                details: error.message // Include the actual error message for debugging
            });
        }

        const blog = await Blogs.create({title,image:mycloud.secure_url,description,user_id});

        res.status(201).json({
            success:true,
            blog
        })
        
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}
export const deleteBlog = async (req,res)=>{
    try{

        const id = req.params.id;

    const blog = await Blogs.findByIdAndDelete(id);
    res.json({
        blog
    })

    }
    catch(error){
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
    
    
}
export const updateBlog = async (req,res)=>{

    try{

        const id = req.params.id;
        if(!id){
            throw Error("invalid id");
        }
        if(!req.file || !req.body){
            throw Error("all feilds are mandatory");
        }

        const fileUri = getDataUri(req.file);
        let mycloud=null;
        try {
            mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
        } catch (error) {
            console.error("Cloudinary upload error:", error);
        
            // Return a more informative error response to the client
            return res.status(500).json({
                error: "Error uploading file to Cloudinary",
                details: error.message // Include the actual error message for debugging
            });
        }
        const {title,description} = req.body;
        const data = {title,image:mycloud.secure_url,description};

    const blog = await Blogs.findByIdAndUpdate(id,{
        ...data
    },{new:true});
    res.json({
        blog
    })


    }
    catch(error){
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
    
}