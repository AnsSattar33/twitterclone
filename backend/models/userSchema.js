import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tweets: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tweet"
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    bookmarks: {
        type: Array,
        default: []
    }

}, {
    timestamps: true
})

const User = mongoose.model("user", userSchema)
export default User