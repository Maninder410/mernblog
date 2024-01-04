import express from "express";
import { userLogin, userSignup } from "../controllers/user.js";
import singleUpload from "../middleware/multer.js";
const router = express.Router();

router.post("/login",userLogin);
router.post("/signup",singleUpload,userSignup);

export default router;