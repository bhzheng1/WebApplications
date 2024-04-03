import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import store from "../stores/userStore";
import { Provider, useSelector, useDispatch } from "react-redux";
import { selectAllPosts, reactionAdded, postAdded } from "../slices/postSlice";
import { selectAllUsers } from "../slices/userSlice";
import { parseISO, formatDistanceToNow } from "date-fns";

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

const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
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

const AddPostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const users = useSelector(selectAllUsers);

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postAdded(title, content, userId));

            setTitle("");
            setContent("");
            setUserId("");
        }
    };

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

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

const PostList = () => {
    const posts = useSelector(selectAllPosts);
    const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    ));

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};

const App = () => {
    return (
        <div>
            <AddPostForm />
            <PostList />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
