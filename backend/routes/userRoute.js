import express from "express"
import { bookmark, follow, getMyProfile, Login, logout, otherUser, Register, unfollow } from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";
const router = express.Router();

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/logout").get(logout)
router.route("/bookmark/:id").put(bookmark)
router.route("/profile/:id").get(getMyProfile)
router.route("/otheruser/:id").get(otherUser)
router.route("/follow/:id").post(isAuthenticated, follow)
router.route("/unfollow/:id").post(isAuthenticated, unfollow)

export default router