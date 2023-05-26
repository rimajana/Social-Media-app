import express from "express";
import {
    getFeedPosts,getUserPosts,likePosts
} from "../controllers/postController.js"
import verifyToken from "../middleware/auth.js";


const router=express.Router();
/*READ*/
router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts);
/*update */
router.patch("/:id/like",verifyToken,likePosts)
export default router;