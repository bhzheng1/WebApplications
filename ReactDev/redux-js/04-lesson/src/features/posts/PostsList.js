import { useSelector } from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts, Status } from "./postsSlice";

import { PostExcerpt } from "./PostExcerpt";

const PostsList =()=>{
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const postError = useSelector(getPostsError);

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
        {content}
    </section>
)
}
export default PostsList;