import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import UserPosts from "@/components/UserPosts";

type Params = {
    params: { userId: string };
};

export async function generateMetadata({
    params: { userId },
}: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId);
    const user = await userData;

    if (!user) {
        return { title: "User Not Found" };
    }
    return {
        title: `User ${user.name}`,
        description: `User ${user.name} profile`,
    };
}

export default async function UserPage({
    params: { userId },
}: Readonly<Params>) {
    const userData: Promise<User> = getUser(userId);
    const userPostsData: Promise<Post[]> = getUserPosts(userId);

    const user = await userData;

    if (!user) notFound();
    return (
        <>
            <h2>{user.name}</h2>
            <br />
            <Suspense fallback={<h2>Loading...</h2>}>
                <UserPosts promise={userPostsData} />
            </Suspense>
        </>
    );
}
