import { configureStore } from "@reduxjs/toolkit";
import sliceData from "./sliceData";

export default configureStore({
  reducer: {
    data: sliceData,
  },
});
