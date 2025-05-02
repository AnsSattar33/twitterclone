import axios from "axios"
import { useEffect } from "react"
import { USER_API_END_POINT } from "../utils/constants"
import { useDispatch } from "react-redux"
import { getOtherUser } from "../redux/userSlice"

const useGetOtherUser = async (id) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`, { withCredentials: true });
                dispatch(getOtherUser(res.data.otherUsers))
            } catch (error) {
                console.log("error in useGetProfile = ", error)
            }
        }

        fetchMyProfile();
    }, [id]);

}
export default useGetOtherUser