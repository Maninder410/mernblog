import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import blogRouter from "./routes/blog.js";
import userRouter from "./routes/users.js";
import cloudinary from "cloudinary";

import cors from "cors";
import auth from "./middleware/auth.js";

const app = express();
app.use(cors({ 
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
cloudinary.v2.config({
  cloud_name: 'ddj5ngrzi',
  api_key: '721394128158988',
  api_secret: 'CkW08alDZQlLdgPZ9zUNepkXeJs',
});



// Middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: true,limit:'25mb' }));
app.use(express.json({limit:'25mb'}));



app.use("/api/v1", blogRouter);
app.use("/api/v1", userRouter);

dotenv.config({ path: "./config/config.env" });


const startServer = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at ${process.env.PORT}`);
    });
};
app.get('/token', auth, (req, res) => {
  // Access user data using req.user
  res.json({ user: req.user });
});
app.get("/", (req, res) => {
    res.send("<h1>Working well and fine</h1>");
});

connectDB().then(startServer);
