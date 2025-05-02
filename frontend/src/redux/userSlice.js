import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    user: null,
    otherUser: null,
    profile: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
        getOtherUser: (state, action) => {
            state.otherUser = action.payload
        },
        getProfile: (state, action) => {
            state.profile = action.payload
        }
    }
})

export const { getOtherUser, getUser, getProfile } = userSlice.actions
export default userSlice.reducer