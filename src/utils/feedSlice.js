import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const newArray = state.filter((e) => {
        if (e._id != action.payload) return e;
      });

      return newArray;
    },
  },
});
export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
