import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    tweet: null,
    isActive: false,
    refresh: false
}

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {
        getTweets: (state, action) => {
            state.tweet = action.payload;
        },
        getIsActive: (state, action) => {
            state.isActive = action.payload
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh
        }

    }
})

export const { getTweets, getRefresh, getIsActive } = tweetSlice.actions
export default tweetSlice.reducer