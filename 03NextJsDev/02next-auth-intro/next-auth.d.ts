// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

interface extraProps {
    role: string,
    accessToken: string,
    email: string,
    refreshToken?: string,
}

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
        } & extraProps & DefaultSession
    }
    interface User extends DefaultUser, extraProps {
        email: string,
        expires_in: number,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT, extraProps {
        id: string,
        email: string,
        accessTokenExpires: number,
    }
}