import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

const sliceData = createSlice({
  name: "sliceData",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { setData } = sliceData.actions;

export default sliceData.reducer;
