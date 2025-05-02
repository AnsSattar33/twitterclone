import Tweet from "../models/tweetSchema.js"
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken"
export const createTweet = async (req, res) => {
    try {
        const { description, id } = req.body

        const user = await User.findById(id).populate("name")

        console.log("user name = ", user)
        if (!description || !id) {

            return res.status(401).json({
                message: "All fields are required",
                success: false
            })
        }
        // const user = await Tweet.findOne({ email: req.user.email })

        const tweet = await Tweet.create({
            description,
            userId: id,
            name: user.name,
            username: user.username
        });


        return res.status(201).json({
            message: "Tweet Created Successfully",
            success: true
        })
        // user.tweets.push(tweet._id)
        // await user.save();

    } catch (error) {
        console.log("error in createTweet = ", error)
    }
}

export const deleteTweet = async (req, res) => {

    try {
        const { id } = req.params

        const userTweet = await Tweet.findByIdAndDelete({ _id: id })
        if (!userTweet) {

            return res.status(401).json({
                message: "Tweet is not Found or you have not created yet",
                success: false
            })
        }

        return res.status(201).json({

            message: "Tweet successfully Deleted",
            success: true
        })
    } catch (error) {

        console.log("deleteTweet", error)
    }
}

export const likeAndUnlikeTweet = async (req, res) => {

    try {
        const userId = req.body.id
        const tweetId = req.params.id
        const tweet = await Tweet.findById(tweetId)

        if (!tweet) {
            return res.status(401).json({
                message: "Tweet is not found",
                success: false
            })
        }
        if (tweet.like.includes(userId)) {
            //dislike
            await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: userId } })
            return res.status(201).json({
                message: "User Dislike your Tweet",
                success: true
            })
        } else {
            await Tweet.findByIdAndUpdate(tweetId, { $push: { like: userId } })
            return res.status(201).json({
                message: "User Liked your Tweet",
                succes: true
            })
        }

    } catch (error) {
        console.log("error in likeAndDislikeTweet = ", error)
    }
}

export const getAllTweet = async (req, res) => {

    // return res.json({u: req.user, t: true, to: req.cookies.token, data: jwt.verify(req.cookies.token, process.env.TOKEN_SECRET)})
    try {
        // const loggedInUserId = req.params.id
        const loggedInUserId = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET).userId;
        const loggedInUser = await User.findById(loggedInUserId)
        const loggedInUserTweets = await Tweet.find({ userId: loggedInUserId })
        const followingUsersTweet = await Promise.all(loggedInUser.following.map((otherUserId) => {

            return Tweet.find({ userId: otherUserId })
        }))
        return res.status(200).json({
            message: "All tweets",
            allTweets: loggedInUserTweets.concat(...followingUsersTweet)
        })

    } catch (error) {
        console.log("error in getAllTweets = ", error)
    }
}

export const getFollowingTweets = async (req, res) => {

    try {
        const loggedInUserId = req.params.id
        const loggedInUser = await User.findById(loggedInUserId)

        const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUser) => {

            return Tweet.find({ userId: otherUser })
        }))

        return res.status(200).json({

            message: "followind Tweets",
            followingUserTweets
        })

    } catch (error) {
        console.log("error in getFollowingTweets = ", error)
    }
}