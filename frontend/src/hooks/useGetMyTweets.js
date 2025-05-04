import axios from "axios"
import { useEffect } from "react"
import { TWEET_API_END_POINT } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { getTweets } from "../redux/tweetSlice"
const useGetMyTweet = async (id) => {
    const { refresh, isActive } = useSelector(state => state.tweet)
    const dispatch = useDispatch();

    const API_BASE_URL = import.meta.env.PROD
        ? "https://twitterclone-backend-six.vercel.app/api/v1/tweet"
        : TWEET_API_END_POINT;

    const fetchMyTweets = async () => {
        try {

            const res = await axios.get(`${API_BASE_URL}/tweets/${id}`, { withCredentials: true });
            dispatch(getTweets(res.data.allTweets))
        } catch (error) {
            console.log("error in useGetMyTweet = ", error)
        }
    }
    const fetchFollowingTweets = async () => {

        try {

            const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`, { withCredentials: true })
            dispatch(getTweets(res.data.followingUserTweets))
        } catch (error) {
            console.log("error in fetchFollowingTweets = ", error)
        }
    }
    useEffect(() => {
        isActive ? fetchFollowingTweets() : fetchMyTweets()
    }, [refresh, isActive]);

}
export default useGetMyTweet