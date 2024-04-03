import { NextResponse } from "next/server"

// export async function GET(request: Request) {
//     return new Response('Hello0, Next.js!')
// }

export async function GET() {
    return NextResponse.json({ "message": 'Hello, Next.js!' })
}

