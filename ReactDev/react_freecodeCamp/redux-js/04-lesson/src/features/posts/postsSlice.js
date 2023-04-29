import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

export const Status = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  failed: "failed",
  pending:'pending',
};

const POST_URL = "https://jsonplaceholder.typicode.com/posts";
const initialState = {
  posts: [],
  status: Status.idle,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
  try {
    const response = await axios.get(POST_URL);
    return response.data;
  } catch (e) {
    return e.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POST_URL, initialPost);
      return response.data;
    } catch (e) {
      return e.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost)=>{
    const {id} = initialPost;
    try {
      const response = await axios.put(`${POST_URL}/${id}`, initialPost)
      return response.data;

    }
    catch(error){
      return initialPost; // only for testing Redux!
    }
  }
)

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (initialPost)=>{
    const {id}  = initialPost;
    try{
      const response = await axios.delete(`${POST_URL}/${id}`);
      if (response?.status===200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    }
    catch(err){
      return err.message;
    }
  }
)

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = Status.loading;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = Status.succeeded;
      let min = 1;
      const loadedPosts = action.payload.map((post) => {
        post.date = sub(new Date(), { minutes: min++ }).toISOString();
        post.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        return post;
      });
      // Add any fetched posts to the array
      state.posts = loadedPosts;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = Status.failed;
      state.error = action.massage;
    },
    [addNewPost.fulfilled]: (state, action) => {
      // run after the add new post action
      // Fix for API post IDs:
      // Creating sortedPosts & assigning the id
      // would be not be needed if the fake API
      // returned accurate new post IDs
      const sortedPosts = state.posts.sort((a, b) => {
        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;
        return 0;
      });
      action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
      // End fix for fake API post IDs

      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };
      console.log(action.payload);
      state.posts.push(action.payload);
    },
    [updatePost.fulfilled]: (state, action)=>{
      if(!action.payload.id){
        console.log("Update could not complate")
        console.log(action.payload);
        return
      }
      const {id} = action.payload;
      action.payload.date  = new Date().toISOString();
      const posts = state.posts.filter(post=>post.id!==id);
      state.posts = [...posts, action.payload];
    },
    [deletePost.fulfilled]:(state, action)=>{
      if(!action.payload.id){
        console.log('Delete could not complete')
        console.log(action.payload)
        return;
      }
      const {id} = action.payload;
      const posts = state.posts.filter(post=>post.id!==id);
      state.posts=posts;
    }
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const selectPostById = (state, postId) => state.posts.posts.find(post=>post.id === postId);


export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
