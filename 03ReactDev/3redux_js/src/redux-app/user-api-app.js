import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "../stores/userApiStore";
import { fetchUsers, selectAllUsers } from "../slices/userApiSlice";
import {
    addNewPost,
    Status,
    selectAllPosts,
    getPostsError,
    getPostsStatus,
    fetchPosts,
    reactionAdded,
} from "../slices/postApiSlice";
import { parseISO, formatDistanceToNow } from "date-fns";
const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
};
const TimeAgo = ({ timestamp }) => {
    let timeAgo = "";
    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
};
const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers);
    const author = users.find((user) => user.id === userId);
    return <span>by {author ? author.name : "Unknown author"}</span>;
};

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(
        ([name, emoji]) => {
            return (
                <button
                    key={name}
                    type="button"
                    className="reactionButton"
                    onClick={() =>
                        dispatch(
                            reactionAdded({ postId: post.id, reaction: name })
                        )
                    }
                >
                    {emoji} {post.reactions[name]}
                </button>
            );
        }
    );

    return <div>{reactionButtons}</div>;
};
const PostExcerpt = ({ post }) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

const AddPostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [addRequestStatus, setAddRequestStatus] = useState(Status.idle);

    const users = useSelector(selectAllUsers);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const canSave =
        [title, content, userId].every(Boolean) &&
        addRequestStatus === Status.idle;

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus(Status.pending);

                //
                dispatch(addNewPost({ title, body: content, userId })).unwrap();
                setTitle("");
                setContent("");
                setUserId("");
            } catch (err) {
                console.error("post failed", err);
            } finally {
                setAddRequestStatus(Status.idle);
            }
        }
    };

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section>
            <h2>Add a new Post</h2>
            <form>
                <label htmlFor="postTitle">Post title</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Post Author</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={onAuthorChanged}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>

                <label htmlFor="postContent">Post Content</label>
                <textarea
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
            </form>
        </section>
    );
};
const PostsList = () => {
    const dispath = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const postError = useSelector(getPostsError);

    useEffect(() => {
        if (postStatus === Status.idle) {
            dispath(fetchPosts());
        }
    }, [postStatus, dispath]);

    let content;
    if (postStatus === Status.loading) {
        content = <p>"Loading... "</p>;
    } else if (postStatus === Status.succeeded) {
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map((post) => (
            <PostExcerpt key={post.id} post={post} />
        ));
    } else if (postStatus === Status.failed) {
        content = <p>{postError}</p>;
    }
    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    );
};
const App = () => {
    store.dispatch(fetchUsers());
    return (
        <main className="App">
            <AddPostForm />
            <PostsList />
        </main>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
