import React from "react";
import RightSidebar from "./RightSidebar";
import LeftSidebar from "./LeftSidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import useGetOtherUser from "../hooks/useGetOtherUser";

const Home = () => {
  const { user, otherUser } = useSelector((state) => state?.user)
  useGetOtherUser(user?._id)
  return (
    <>
      <div className="md:flex md:justify-between md:container md:mx-auto ">
        <LeftSidebar />
        <Outlet />
        <RightSidebar otherUser={otherUser} />
      </div>
      <Toaster />
    </>
  );
};

export default Home;
