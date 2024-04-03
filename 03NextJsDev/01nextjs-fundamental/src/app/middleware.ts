import { NextResponse } from "next/server";
const allowedOrigins = process.env.NODE_ENV === "production"
    ? ['https://example1.com', 'https://www.example2.com']
    : ['http://localhost:3000', 'https://www.google.com'];

export function middleware(req: Request) {
    console.log("Middleware called");
    const origin = req.headers.get('origin') as string;
    console.log(origin);
    if (origin && !allowedOrigins.includes(origin)) {
        return new NextResponse(null, {
            status: 401,
            statusText: 'Unauthorized',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": allowedOrigins[0]
            }
        });
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: "/api/:path*",
}