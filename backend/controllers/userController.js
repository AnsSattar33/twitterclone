import User from "../models/userSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: ".env" })
export const Register = async (req, res) => {

    try {
        const { name, username, email, password } = req.body
        if (!name || !username || !email || !password) {

            return res.status(401).json({
                message: "All Field Are required",
                success: false
            })
        }

        const isAlreadyRegistered = await User.findOne({ email })

        if (isAlreadyRegistered) {

            return res.status(401).json({
                message: "User Already Exist",
                success: false
            })
        }


        const hash = await bcrypt.hash(password, 16);

        const user = await User.create({
            name,
            username,
            email,
            password: hash
        })

        const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET, { expiresIn: "1d" });


        return res.status(201).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            message: "Account has been Created Successfully.",
            success: true
        })


    } catch (error) {
        console.log("err in Register = ", error)
    }
}

export const Login = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {

            return res.status(401).json({
                message: "All Field Are required",
                success: false
            })
        }

        const user = await User.findOne({ email })
        if (!user) {

            return res.status(201).json({
                message: "User doesn't have an account",
                success: false
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {

            return res.status(201).json({
                message: "email and password incorrect",
                success: false
            })
        }

        const token = jwt.sign({ email: email, userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        return res.status(201).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            message: "Login Successfully",
            user,
            success: true
        })

    } catch (error) {
        console.log("error in login = ", error)
    }

}

export const logout = async (req, res) => {

    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "User Logout",
        success: true
    })
}

export const bookmark = async (req, res) => {

    try {
        const userId = req.body.id
        const tweetId = req.params.id
        console.log(userId, tweetId)
        const user = await User.findById(userId)

        if (!user) {
            return res.status(401).json({
                message: "Tweet is not found",
                success: false
            })
        }

        if (user.bookmarks.includes(tweetId)) {

            //unsave
            console.log("i am here")

            await User.findByIdAndUpdate(userId, { $pull: { bookmarks: tweetId } })

            res.status(200).json({
                message: "tweet removed to bookmark Successfully",

            })
        } else {
            await User.findByIdAndUpdate(userId, { $push: { bookmarks: tweetId } })

            res.status(200).json({
                message: "tweet Bookmar Successfully",

            })
        }

    } catch (error) {
        console.log("error in bookmark = ", error)
    }

}

export const getMyProfile = async (req, res) => {

    try {
        const userId = req.params.id
        const user = await User.findById(userId).select("-password")
        console.log("user in profile = ", user)

        if (!user) {

            return res.status(401).json({

                message: "User not found",
            })
        }

        return res.status(201).json({

            message: "User has been found",
            user
        })

    } catch (error) {
        console.log("error in profile = ", error)
    }
}

export const otherUser = async (req, res) => {

    try {
        const userId = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET).userId

        const otherUsers = await User.find({ _id: { $ne: userId } }).select("-password")

        return res.status(200).json({
            message: "All Users are Here",
            otherUsers
        })
    } catch (error) {
        console.log("error in otheruser", error)
    }
}

export const follow = async (req, res) => {

    try {

        const userLoggedInId = req.body.id
        const userId = req.params.id

        const userLoggedIn = await User.findById(userLoggedInId)
        const user = await User.findById(userId)

        if (!user.followers.includes(userLoggedInId)) {

            await user.updateOne({ $push: { followers: userLoggedInId } })
            await userLoggedIn.updateOne({ $push: { following: userId } })
        } else {

            return res.status(401).json({
                message: `user already followed to ${user.name}`
            })
        }

        return res.status(200).json({
            message: `${userLoggedIn.name} just follow to ${user.name}`
        })

    } catch (error) {
        console.log("error in follow = ", error)
    }
}
export const unfollow = async (req, res) => {

    try {

        const userLoggedInId = req.body.id
        const userId = req.params.id

        const userLoggedIn = await User.findById(userLoggedInId) //user3
        const user = await User.findById(userId) //user2

        if (userLoggedIn.following.includes(userId)) {

            await user.updateOne({ $pull: { followers: userLoggedInId } })
            await userLoggedIn.updateOne({ $pull: { following: userId } })
        } else {

            return res.status(401).json({
                message: `user has not follows yet`
            })
        }

        return res.status(200).json({
            message: `${userLoggedIn.name} unfollow to ${user.name}`
        })

    } catch (error) {
        console.log("error in follow = ", error)
    }
}