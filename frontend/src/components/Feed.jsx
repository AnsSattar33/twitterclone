import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";
import useGetMyTweet from "../hooks/useGetMyTweets";

const Feed = () => {

  const { tweet } = useSelector(state => state.tweet)
  const { user } = useSelector(state => state.user)
  console.log(user)
  useGetMyTweet(user?._id);
  return (
    <div className="md:w-2/4 border-l border-r border-gray-200">
      <CreatePost />
      {
        tweet?.map((singleTweet) => (
          <Tweet key={singleTweet?._id} tweet={singleTweet} user={user} />
        ))
      }
    </div>
  );
};

export default Feed;
