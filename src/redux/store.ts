import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './slices'
import userReducer from "./userSlice";

export  const store = configureStore({
  reducer: {
    root: rootReducer,
    Users: userReducer,
  }
})