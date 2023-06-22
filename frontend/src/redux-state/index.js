import { createSlice } from "@reduxjs/toolkit";

const initialst = {
  user: null,
  token: null,
  posts: [],
};


export const authSlice = createSlice({
    name: "auth",
    initialst,
    reducers: {
      
      setLogin: (st, action) => {
        st.user = action.payload.user;
        st.token = action.payload.token;
      },
      setLogout: (st) => {
        st.user = null;
        st.token = null;
      },
   
      setPosts: (st, action) => {
        st.posts = action.payload.posts;
      },
      setPost: (st, action) => {
        const updatedPosts = st.posts.map((post) => {
          if (post._id === action.payload.post._id) return action.payload.post;
          return post;
        });
        st.posts = updatedPosts;
      },
      setFriends: (st, action) => {
        if (st.user) {
          st.user.friends = action.payload.friends;
        } else {
          console.error("user friends non-existent :(");
        }
      },
    
    },
  });
  
  export const { setMode, setLogin, setLogout,  setFriends,setPosts, setPost } =
    authSlice.actions;
  export default authSlice.reducer;