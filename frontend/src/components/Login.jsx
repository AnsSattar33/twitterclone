import React, { useState } from "react";
import { USER_API_END_POINT } from "../utils/constants"
import toast from "react-hot-toast";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {

    e.preventDefault();
    if (isLogin) {
      //login
      try {

        const res = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        })
        if (res.data.success) {
          dispatch(getUser(res?.data.user))
          navigate("/")
          toast.success(res.data.message)
        }

      } catch (error) {
        toast.error(error.response.data.message)
        console.log("error = ", error)
      }
    } else {
      //register

      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, { name, username, email, password }, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        })
        console.log(res)
        if (res.data.success) {
          setIsLogin(true)
          toast.success(res.data.message)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }


  }

  const loginSignupHandler = () => {

    setIsLogin(!isLogin)
  }

  return (
    <div className="w-screen h-screen  flex items-center justify-center">
      <div className="flex items-center justify-evenly w-4/5">
        <div>
          <img
            className=""
            src="https://www.freepnglogos.com/x-twitter-png-logo-3.jpg"
            alt="twitter-log"
            width={400}
          />
        </div>
        <div className="space-y-5">
          <div className="">
            <h1 className="font-bold text-7xl ">Happening Now</h1>
          </div>
          <h1 className=" text-2xl font-bold">Twitter {isLogin ? "Login" : "Signup"}</h1>
          <form onSubmit={submitHandler} className="flex flex-col w-2/4 space-y-2">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-blue-400 px-2 py-1 outline-none rounded-md font-semibold"
                />
                <input

                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-blue-400 px-2 py-1 outline-none rounded-md font-semibold"
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-blue-400 px-2 py-1 outline-none rounded-md font-semibold"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-blue-400 px-2 py-1 outline-none rounded-md font-semibold"
            />
            <button type="submit" className="px-4 w-20 py-2 border-none bg-[#1D9BF0] rounded-xl text-white font-semibold ">
              {isLogin ? "Login" : "Signup"}
            </button>
            <h1>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span className="text-blue-400 hover:text-blue-600 cursor-pointer" onClick={loginSignupHandler}>
                {isLogin ? "Signup" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
