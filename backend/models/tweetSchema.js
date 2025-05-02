import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    like: {
        type: Array,
        default: [],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

}, {
    timestamps: true
})

const Tweet = mongoose.model("tweet", tweetSchema)
export default Tweet