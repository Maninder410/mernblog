import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: '5d'
    });
}

export const userSignup = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        // 
        if (!name || !email || !password ) {
            throw Error("All fields are mandatory");
        }
          
        // Check if the user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            throw Error("User already exists");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
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

            const user = await User.create({ name, email, password: hash, photo:mycloud.secure_url});

            // Generate token
            const token = generateToken(user._id);
    
            res.status(201).json({
                user,
                token
            })
       
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}
// Rest of your code...

export const userLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if( !email || !password ){
            throw  Error("All fields are mandatory");
        }
        const user = await User.findOne({email});
        if(!user){
            throw  Error("Incorrect Email");
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match){
            throw Error("Incorrect Password");
        }
        const token = generateToken(user._id);
         res.status(200).json({
            user,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            error:error.message
        })
    }
}