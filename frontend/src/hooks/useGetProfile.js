import axios from "axios"
import { useEffect } from "react"
import { USER_API_END_POINT } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../redux/userSlice"
const useGetProfile = async (id) => {

    const dispatch = useDispatch();
    const { refresh } = useSelector(state => state.tweet)

    const API_BASE_URL = import.meta.env.PROD
        ? "https://twitterclone-backend-beta.vercel.app"
        : USER_API_END_POINT;

    useEffect(() => {
        const fetchOtherUser = async () => {
            try {

                const res = await axios.get(`${API_BASE_URL}/profile/${id}`, { withCredentials: true });
                dispatch(getProfile(res.data.user))
            } catch (error) {
                console.log("error in useGetProfile = ", error)
            }
        }

        fetchOtherUser();
    }, [id, refresh]);

}
export default useGetProfile