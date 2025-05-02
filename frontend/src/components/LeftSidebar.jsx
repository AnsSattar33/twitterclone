import React from "react";
import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { IoLogOutOutline, IoSearchSharp, IoReaderSharp } from "react-icons/io5";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftSidebar = () => {
  const { user } = useSelector((state) => state.user)
  return (
    <div className="md:w-1/5 md:space-y-8">
      {/* searchBar */}
      <div className="flex justify-between w-full">
        <img
          className="m-2"
          src="https://www.freepnglogos.com/x-twitter-png-logo-3.jpg"
          alt="twitter-log"
          width={32}
        />
        <div className="w-full">
          <div className="md:hidden ">
            <div className="flex justify-start items-center px-2 p-2 bg-gray-100 rounded-full">
              <IoSearchSharp size={24} />
              <input
                type="text"
                className="w-full p-2 rounded-sm bg-transparent outline-none"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>
      {/* profile */}

      <div className="space-y-4">
        <Link to={"/"} className="flex items-center gap-3 p-2 pr-20 cursor-pointer hover:bg-gray-200 rounded-xl">
          <div>
            <GoHome size={24} />
          </div>
          <h1 className="text-xl font-bold">
            Home
          </h1>
        </Link>
        <div className="flex items-center gap-3 p-2 pr-20 cursor-pointer hover:bg-gray-200 rounded-xl">
          <div>
            <MdOutlineExplore size={24} />
          </div>
          <h1 className="text-xl font-bold">Explore</h1>
        </div>
        <div className="flex items-center gap-3 p-2 pr-20 cursor-pointer hover:bg-gray-200 rounded-xl">
          <div>
            <IoMdNotificationsOutline size={24} />
          </div>
          <h1 className="text-xl font-bold">Notification</h1>
        </div>
        <Link to={`/profile/${user?._id}`} className="flex items-center gap-3 p-2 pr-20 cursor-pointer hover:bg-gray-200 rounded-xl">
          <div>
            <FaRegUser size={24} />
          </div>
          <h1 className="text-xl font-bold">Profile</h1>
        </Link>
        <div className="flex items-center gap-3 p-2 pr-20 cursor-pointer hover:bg-gray-200 rounded-xl">
          <div>
            <FaRegBookmark size={24} />
          </div>
          <h1 className="text-xl font-bold">Bookmark</h1>
        </div>
        <div className="flex items-center gap-3 p-2 pr-20 cursor-pointer hover:bg-gray-200 rounded-xl">
          <div>
            <IoLogOutOutline size={24} />
          </div>
          <h1 className="text-xl font-bold">Logout</h1>
        </div>
        <Link to={'/login'} className="flex items-center gap-3 p-2 pr-20 cursor-pointer hover:bg-gray-200 rounded-xl">
          <div>
            <IoLogOutOutline className="rotate-180" size={24} />
          </div>
          <h1 className="text-xl font-bold">Login</h1>
        </Link>
        <Link to={'/readme'} title="Read me Before Using TwitterClone" className="flex items-center gap-3 pr-20 cursor-pointer text-white hover:text-black hover:bg-gray-200  p-4 border-none bg-red-400 w-3/4 rounded-full">
          <div>
            <IoReaderSharp size={24} />
          </div>
          <h1 className="text-xl font-bold ">Read me</h1>
        </Link>
        <button className="p-4 border-none bg-[#1D9BF0] w-3/4 rounded-full text-white font-bold ">
          Post
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
