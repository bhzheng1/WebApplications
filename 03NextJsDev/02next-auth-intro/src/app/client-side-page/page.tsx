"use client";

// Remember you must use the AuthProvider to get the SessionProvider for client components to useSession
import { useSession, getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserCard from "@/components/UserCard";

export default function ClientPage() {
    // give data a alias name
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated: () => {
            redirect("/api/auth/signin?callbackUrl=/client-component");
        },
    });

    getSession().then((session) => {
        console.log("session in client with get session", session);
    });

    console.log("session in client with use session", session);

    if (!session?.user) return;

    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pageType={"Client"} />
        </section>
    );
}
