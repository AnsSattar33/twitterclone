import React from "react";
import Avatar from "react-avatar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
const Profile = () => {
    const dispatch = useDispatch();
    const { user, profile } = useSelector(state => state?.user)
    const { id } = useParams();
    console.log(id)
    useGetProfile(id)
    console.log(user)
    const followHandler = async () => {



        if (user.following?.includes(id)) {
            try {
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id: user._id }, {
                    headers: {
                        "Content-Type": "application/json",

                    },
                    withCredentials: true
                })
                dispatch(getRefresh())
                toast.success(res.data.message)

            } catch (error) {
                toast.error(error.response.data.message)
            }
        } else {
            try {
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id: user._id }, {
                    headers: {
                        "Content-Type": "application/json",

                    },
                    withCredentials: true
                })
                dispatch(getRefresh())
                toast.success(res.data.message)

            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
    }

    return (
        <div className="md:w-2/4 md:block border-l border-r border-gray-200">
            <div>
                <div className="flex items-center gap-6 py-2">
                    <Link to={"/"} className="p-2 rounded-full hover:bg-gray-100">
                        <IoMdArrowRoundBack size={24} />
                    </Link>
                    <div className="gap-2">
                        <h1 className="font-bold text-lg">{profile?.name ? profile.name : "User Name"}</h1>
                        <p className="text-gray-500 text-sm">10 posts</p>
                    </div>
                </div>

                <img
                    className="w-full h-80 object-cover p-2"
                    src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3AtMjAwLWV5ZS0wMzQyNzAyLmpwZw.jpg"
                    alt="banner"
                />
                <div className="absolute ml-2 top-[49rem] md:top-80 md:ml-4 bg-red-200 border-4 border-white rounded-full ">
                    <Avatar googleId="118096717852922241760" size="120" round={true} />
                </div>
                <div onClick={followHandler} className="text-right p-4">
                    {
                        profile?._id === user?._id ? (<button className="px-4 py-1 rounded-full hover:bg-gray-100 border border-black text-xl">Edit Profile</button>) : (<button className="px-4 py-1 rounded-full bg-black text-white text-xl">{user.following.includes(id) ? "following" : "follow"}</button>)
                    }

                </div>
                <div className="m-6">
                    <h1 className="font-bold text-xl">{profile?.name ? profile.name : "User Name"}</h1>
                    <p className="">@{profile?.username ? profile.username : "username"}</p>
                </div>
                <div className="m-6">
                    <p>{profile?.usernamem ? profile.username : "Username"} is a prominent Indonesian filmmaker, writer, and director. He is best known for his work in the Indonesian film industry, with a notable career spanning several decades. His notable films include "Tujuh Biang Keladi" (1984) and "Jiran" (1986), showcasing his diverse talents.</p>
                </div>
            </div>

        </div>
    );
};

export default Profile;
