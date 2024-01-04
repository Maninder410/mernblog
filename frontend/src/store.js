import {configureStore} from "@reduxjs/toolkit";
import blogReducer from "./Reducers/blogReducer";
import authReducer from "./Reducers/authReducer";

const store = configureStore({
    reducer:{
        blog:blogReducer,
        auth:authReducer
    }
})
export default store;