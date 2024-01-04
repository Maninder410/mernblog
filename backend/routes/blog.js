import express from "express";
import { createBlog, deleteBlog, getBlogs, updateBlog } from "../controllers/blog.js";
import auth from "../middleware/auth.js";
import singleUpload from "../middleware/multer.js";

const router = express.Router();
router.get("/get",auth,getBlogs);
router.post("/create",auth,singleUpload,createBlog);
router.patch("/update/:id",auth,singleUpload,updateBlog);
router.delete("/delete/:id",auth,deleteBlog);


export default router;