import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";


const MINUTE = 60;
const HOUR = 60 * MINUTE;

async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        // fetch access token with refresh token from your backend 
        if (token.refreshToken === "hello refresh token") {
            token.accessToken = "hello access token @" + new Date().toString();
            console.log("token refreshed", token);
        }
        return token;
    }
    catch (err) {
        console.log("Error refreshing token", err);
        return {
            ...token,
            error: "RefreshAccessTokenError",
            status: 500,
            message: "Error refreshing access token"
        };
    }
}


export const options: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                username: { label: "username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "**********" }
            },
            async authorize(credentials) {
                if (credentials?.username.toLowerCase() !== "admin" || credentials?.password !== "Test!123") {
                    throw new Error("Invalid credentials");
                }
                const user = {
                    id: "1",
                    name: "Admin",
                    email: "admin@gmail.com",
                    role: "admin",
                    accessToken: "hello access token",
                    expires_in: 1 * MINUTE,
                    refreshToken: "hello refresh token"
                };
                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 8 * HOUR,
    },
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            //console.log("signIn callback", { user, account, profile, email, credentials })
            return true
        },
        async redirect({ url, baseUrl }) {
            //console.log("redirect callback", { url, baseUrl })
            return baseUrl
        },
        async jwt({ token, user }) {
            //console.log("jwt callback", { token, user })

            console.log("jwt callback called")

            // Initial sign in
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.role = user.role;
                token.accessToken = user.accessToken;
                token.accessTokenExpires = Date.now() + user.expires_in * 1000;
                token.email = user.email;
                token.refreshToken = user.refreshToken;

            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token);
        },
        async session({ session, user, token }) {
            //console.log("session callback", { session, user, token })

            console.log("session callback called")

            if (session?.user && token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.accessToken = token.accessToken;
                session.user.email = token.email;
            }
            return session
        },
    }
}