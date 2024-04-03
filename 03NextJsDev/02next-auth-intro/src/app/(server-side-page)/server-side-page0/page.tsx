import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "@/components/UserCard";
import { redirect } from "next/navigation";

// protected with session!
export default async function ServerPage() {
    const session = await getServerSession(options);
    console.log("session in server", session);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/server-side-page0");
    }

    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pageType={"Server"} />
        </section>
    );
}
