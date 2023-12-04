import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User{
    access_token: string | null
  }
  interface Session {
    user: User & {
        access_token: string
    }
    token:{
        access_token: string
    }
  }
}