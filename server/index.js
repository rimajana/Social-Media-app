import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"

import { register} from "./controllers/authController.js"
import {createPost} from "./controllers/postController.js"

import connectDb from "./config/dbConnection.js";
/*CONFIGURATIONS*/
import verifyToken from "./middleware/auth.js";
import user from "./models/userModel.js";
import Post from "./models/postModel.js";
import {users,posts} from "./data/mockdata.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

connectDb();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extented: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


/*FILE STORAGE*/
// we are storing locally
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

const port = process.env.PORT || 6001;
app.post("/auth/register", upload.single("picture"), register)
app.post("/posts",verifyToken,upload.single("picture"),createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes)
app.use("/posts",postRoutes);

app.listen(port, () => {
    console.log(`Connected to port ${port}`);
    // user.insertMany(users);
    // Post.insertMany(posts);
});
