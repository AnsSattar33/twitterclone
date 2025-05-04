import axios from "axios"
import { useEffect } from "react"
import { USER_API_END_POINT } from "../utils/constants"
import { useDispatch } from "react-redux"
import { getOtherUser } from "../redux/userSlice"

const useGetOtherUser = async (id) => {

    const API_BASE_URL = import.meta.env.PROD
        ? "https://twitterclone-backend-beta.vercel.app/api/v1/user"
        : USER_API_END_POINT;

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/otheruser/${id}`, { withCredentials: true });
                dispatch(getOtherUser(res.data.otherUsers))
            } catch (error) {
                console.log("error in useGetProfile = ", error)
            }
        }

        fetchMyProfile();
    }, [id]);

}
export default useGetOtherUser