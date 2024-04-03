import { type NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;

    const token = await getToken({ req, secret });

    console.log("JSON Web Token", token);
    return Response.json(token);
}