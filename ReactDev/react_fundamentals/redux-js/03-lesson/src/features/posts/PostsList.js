import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts, Status } from "./postsSlice";

import { useEffect } from "react";
import { PostExcerpt } from "./PostExcerpt";

const PostsList =()=>{
    const dispath = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const postError = useSelector(getPostsError);

    useEffect(()=>{
        if(postStatus === Status.idle ){
            dispath(fetchPosts());
        }
    },[postStatus,dispath]);

    let content;
    if(postStatus===Status.loading){
        content = <p>"Loading... "</p>;
    }else if(postStatus===Status.succeeded){
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map(post=><PostExcerpt key={post.id} post={post}/>)
    }else if(postStatus===Status.failed){
        content=<p>{postError}</p>
    }
return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
)
}
export default PostsList;