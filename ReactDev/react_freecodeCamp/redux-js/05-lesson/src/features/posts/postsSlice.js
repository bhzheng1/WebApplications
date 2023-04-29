import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

export const Status = {
  idle: "idle",
  loading: "loading",
  succeeded: "succeeded",
  failed: "failed",
  pending: "pending",
};

const POST_URL = "https://jsonplaceholder.typicode.com/posts";
const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: Status.idle,
  error: null,
  count: 0,
});

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts", async () => {
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
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POST_URL}/${id}`, initialPost);
      return response.data;
    } catch (error) {
      return initialPost; // only for testing Redux!
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POST_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount(state, action) {
      state.count = state.count + 1;
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
      postsAdapter.upsertMany(state, loadedPosts);
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = Status.failed;
      state.error = action.massage;
    },
    [addNewPost.fulfilled]: (state, action) => {
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
      postsAdapter.addOne(state, action.payload);
    },
    [updatePost.fulfilled]: (state, action) => {
      if (!action.payload.id) {
        console.log("Update could not complate");
        console.log(action.payload);
        return;
      }
      action.payload.date = new Date().toISOString();
      postsAdapter.upsertOne(state, action.payload);
    },
    [deletePost.fulfilled]: (state, action) => {
      if (!action.payload.id) {
        console.log("Delete could not complete");
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      postsAdapter.removeOne(state, id);
    },
  },
});

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  //pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.posts);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

//memorized selector
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const { increaseCount, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;