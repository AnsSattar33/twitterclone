import React from "react";
import Avatar from "react-avatar";
import { MdOutlineComment } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/constants";
import { getRefresh } from "../redux/tweetSlice";
import toast from "react-hot-toast";

const Tweet = ({ tweet, user }) => {
  const dispatch = useDispatch();

  const API_BASE_URL = import.meta.env.PROD
    ? "https://twitterclone-backend-six.vercel.app/api/v1/tweet"
    : TWEET_API_END_POINT;

  const likeHandler = async (id) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/like/${id}`, { id: user?._id }, {
        withCredentials: true
      })
      dispatch(getRefresh())
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log("error in tweet = ", tweet)
    }
  }

  const deleteHandler = async (id) => {
    try {

      axios.defaults.withCredentials = true
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`)

      if (res.data.success) {
        dispatch(getRefresh())
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log("error in deleteHandler = ", error)
      toast(error.response.data.message)
    }
  }
  return (
    <div>
      <div className="flex gap-3 p-4 border-b border-gray-200">
        <Avatar googleId="118096717852922241760" size="40" round={true} />
        <div className="w-full space-y-7">
          <div>
            <div className="flex gap-2 items-center">
              <h1 className="font-bold text-sm">{tweet?.name}</h1>
              <p className="text-gray-500 text-sm">{`@${tweet?.username}.${tweet?.createdAt}`}</p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex  items-center gap-1">
              <MdOutlineComment size={24} />
              <p>0</p>
            </div>
            <div onClick={() => likeHandler(tweet?._id)} className="flex cursor-pointer items-center gap-1">
              <FaRegHeart size={24} />
              <p>{tweet?.like?.length}</p>
            </div>
            <div className="flex items-center gap-1">
              <FaRegBookmark size={24} />
              <p>0</p>
            </div>
            {
              tweet?.userId === user?._id && (
                <div onClick={() => deleteHandler(tweet?._id)} className="flex cursor-pointer items-center gap-1">
                  <MdDelete size={24} />
                  <p>0</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div >
  );
};

export default Tweet;
