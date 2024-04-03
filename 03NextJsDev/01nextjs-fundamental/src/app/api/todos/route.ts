import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const origin = request.headers.get('origin') as string;
    const result: { message: string } = { message: "hello world" };

    return new NextResponse(JSON.stringify(result), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': origin, // assign the origin, otherwise it will be blocked
            'Content-Type': 'application/json',
        }
    })
}