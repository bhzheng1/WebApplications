import { getAllUsers } from "@/lib";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "static site generation",
};
export default async function Page() {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;

    const content = (
        <section>
            <h2>
                <Link href="/">Back to Home</Link>
            </h2>
            <br />
            {users.map((user) => {
                return (
                    <>
                        <p key={user.id}>
                            <Link href={`/ssg/${user.id}`}>{user.name}</Link>
                        </p>
                        <br />
                    </>
                );
            })}
        </section>
    );

    return content;
}
