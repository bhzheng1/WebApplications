import React from "react";
type Params = {
    params: {
        postId: string;
    };
};
export default function PostPage({ params: { postId } }: Readonly<Params>) {
    return <div>postId: {postId}</div>;
}
