import { useSelector } from "react-redux";
import { selectPostIds, getPostsError, getPostsStatus, Status } from "./postsSlice";

import { PostExcerpt } from "./PostExcerpt";

const PostsList =()=>{
    const orderedPostIds = useSelector(selectPostIds);
    const postStatus = useSelector(getPostsStatus);
    const postError = useSelector(getPostsError);

    let content;
    if(postStatus===Status.loading){
        content = <p>"Loading... "</p>;
    }else if(postStatus===Status.succeeded){
        content = orderedPostIds.map(postId=><PostExcerpt key={postId} postId={postId}/>)
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