import {createReducer} from "@reduxjs/toolkit";

const authReducer = createReducer({
    user:null
},{
    LOGIN_USER:(state,action)=>{
        state.user = action.payload;
    },
    LOGOUT_USER:(state)=>{
        state.user = null;
    }
})
export default authReducer;