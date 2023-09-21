import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slice";
const store = configureStore({
  reducer: {
    state: reducer
  },
});

export default store;