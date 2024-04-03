export default async function getUser(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`,
        { next: { revalidate: 60 } }); //ISR with revalidate.
    if (!res.ok) return undefined;

    return res.json();
}