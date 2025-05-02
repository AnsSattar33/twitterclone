import React from "react";
import Avatar from "react-avatar";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const RightSidebar = ({ otherUser }) => {
  return (
    <div className="md:w-3/12 p-3 space-y-4 ">
      <div className="hidden md:block ">
        <div className="flex justify-start items-center px-2 p-2 bg-gray-100 rounded-full">
          <IoSearchSharp size={24} />
          <input
            type="text"
            className="w-full p-2 rounded-sm bg-transparent outline-none"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg max-h-screen space-y-4">
        <h1 className="font-bold text-lg">Who To Follow</h1>
        {
          otherUser?.map((user) => (
            <div key={user?._id} className="flex justify-between items-start">
              <div className="flex gap-3">
                <div>
                  <Avatar googleId="118096717852922241760" size="40" round={true} />
                </div>
                <div className="">
                  <h1 className="font-bold text-base">{user?.name}</h1>
                  <p className="text-sm">@{user?.username}</p>
                </div>
              </div>
              <Link to={`/profile/${user?._id}`}>
                <button className="bg-black text-white px-4 py-1 rounded-full text-sm ">
                  Profile
                </button>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default RightSidebar;
