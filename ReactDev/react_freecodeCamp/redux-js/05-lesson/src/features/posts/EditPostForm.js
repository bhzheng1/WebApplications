import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { selectAllUsers } from "../users/usersSlice";
import { selectPostById, Status, updatePost, deletePost } from "./postsSlice";

export const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState(Status.idle);
  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === Status.idle;

const userOptions = users.map(user=>(
    <option
    key = {user.id}
    value = {user.id} 
    >{user.name}</option>
))
  const onSavePostClicked = () => {
    if(canSave){
        try{
            setRequestStatus(Status.pending);
            dispatch(updatePost({id:post.id, title, body: content, userId, reactions: post.reactions})).unwrap();
            setTitle('');
            setContent('');
            setUserId('');
            navigate(`/post/${postId}`);
        }
        catch(err){
            console.error('Failed to save the post', err);
        } finally{
            setRequestStatus(Status.idle);
        }
    }
  };

  const onDeletePostClicked = () => {
    try {
        setRequestStatus(Status.pending);
        dispatch(deletePost({id: post.id})).unwrap();
        setTitle('');
        setContent('');
        setUserId('');
        navigate(`/`);

    }
    catch(err){
        console.error('Failed to save the post', err);
    } finally{
        setRequestStatus(Status.idle);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Post Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button
          className="deleteButton"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};
