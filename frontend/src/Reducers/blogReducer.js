import {createReducer} from "@reduxjs/toolkit";

const blogReducer = createReducer({
    blogs:[],
    id:'',
    title:'',
    image:'',
    description:''
},{
    GET_BLOGS:(state,action)=>{
        state.blogs = action.payload;
    },
 EDIT_BLOG:(state,action)=>{
    state.id = action.payload.id;
    state.title = action.payload.title;
    state.image = action.payload.image;
    state.description = action.payload.description;


 },
DELETE_BLOG:(state,action)=>{
    let arr = state.blogs.filter(item=>item._id !==action.payload._id);
    state.blogs = arr;
},
 CLEAR_BLOG:(state)=>{
    state.id = '';
    state.title = '';
    state.image = '';
    state.description = '';


 }
})
export default blogReducer;