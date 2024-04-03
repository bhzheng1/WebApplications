import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userApiSlice";
import postReducer from "../slices/postApiSlice";

export default configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer,
    },
});
