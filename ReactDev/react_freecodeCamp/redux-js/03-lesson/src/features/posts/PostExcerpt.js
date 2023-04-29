import React from "react";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import PostAuthor from "./PostAuthor";

export const PostExcerpt = ({ post }) => {
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
