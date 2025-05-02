import React, { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { getIsActive, getRefresh } from "../redux/tweetSlice";
const CreatePost = () => {
  const { user } = useSelector(state => state.user)
  const { isActive } = useSelector(state => state.tweet)
  const [description, setDescription] = useState("")
  const dispatch = useDispatch();
  const submitHandler = async () => {
    try {
      const res = await axios.post(`${TWEET_API_END_POINT}/create`, { description, id: user?._id }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (res.data.success) {
        dispatch(getRefresh())
        setDescription("")
        toast.success(res.data.message)
      }

    } catch (error) {
      toast.error(error.response.data.message)
      console.log("error in createPost = ", error)
    }
  }

  const foryouHandler = () => {
    dispatch(getIsActive(false));
  }
  const followingHandler = () => {
    dispatch(getIsActive(true));
  }

  return (
    <div className="w-ful">
      <div className="">
        <div className="flex justify-between items-center border-b border-gray-300">
          <div onClick={foryouHandler} className="cursor-pointer hover:bg-gray-300 w-full text-center px-6 py-3">
            <h1 className="text-gray-700 text-lg font-semibold">For Your</h1>
          </div>
          <div onClick={followingHandler} className="cursor-pointer hover:bg-gray-300 w-full text-center px-6 py-3">
            <h1 className="text-gray-700 text-lg font-semibold">Following</h1>
          </div>
        </div>
        <div className="m-8 flex gap-4 text-lg ">
          <div>
            <Avatar googleId="118096717852922241760" size="52" round={true} />
          </div>
          <input
            className="text-xl outline-none w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="What is happening?"
          />
        </div>
        <div className="border-t border-gray-200">
          <div className="flex justify-between items-center p-4">
            <CiImageOn size={30} className="text-[#1D9BF0]" />
            <button onClick={submitHandler} className="px-8 py-2 border-none bg-[#1D9BF0] rounded-full text-white font-bold ">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
