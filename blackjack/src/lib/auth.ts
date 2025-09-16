import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { prisma } from "./prisma"
import Google from "next-auth/providers/google"

 

// configuração do next-auth
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  trustHost:true,
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
})


