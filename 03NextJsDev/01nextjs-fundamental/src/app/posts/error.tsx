"use client";

export default function ErrorPage({
    error,
    reset,
}: {
    error: string;
    reset: () => void;
}) {
    return (
        <div>
            <h1>Error</h1>
            <p>Something went wrong.</p>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}
