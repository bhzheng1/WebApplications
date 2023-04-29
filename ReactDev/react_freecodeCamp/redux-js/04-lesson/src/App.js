import React from "react";
import "./App.css";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import { EditPostForm } from "./features/posts/EditPostForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />}></Route>
        <Route path="post">
          <Route index element={<AddPostForm />}></Route>
          <Route path=":postId" element={<SinglePostPage />}></Route>
          <Route path="edit/:postId" element={<EditPostForm/>}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
