import express from "express";
import { getNewsfeedPosts, getUserPosts, like} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getNewsfeedPosts);
router.get("/:userId/post", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, like);

export default router;