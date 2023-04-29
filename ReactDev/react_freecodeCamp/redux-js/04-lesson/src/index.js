import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { fetchUsers } from './features/users/usersSlice';
import { fetchPosts } from './features/posts/postsSlice';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}></Route>
      </Routes>
      </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
