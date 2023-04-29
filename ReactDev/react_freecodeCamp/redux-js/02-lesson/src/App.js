import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';

function App() {
  return (
    <main className="App">
      <PostsList />
      <AddPostForm />
    </main>
  );
}

export default App;
