import express from "express"
import isAuthenticated from "../config/auth.js";
import { createTweet, deleteTweet, getAllTweet, getFollowingTweets, likeAndUnlikeTweet } from "../controllers/tweetController.js";
const router = express.Router();

router.route("/create").post(isAuthenticated, createTweet)
router.route("/delete/:id").delete(isAuthenticated, deleteTweet)
router.route("/like/:id").put(isAuthenticated, likeAndUnlikeTweet)
router.route("/tweets/:id").get(isAuthenticated, getAllTweet)
router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets)

export default router