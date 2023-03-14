import bcrypt from 'bcrypt';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/prisma/client';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // GithubProvider ?
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          }
        })
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (user && isValid) return user;
        else return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(token.sub),
        }
      })
      session.user = user;
      return session;
    },
    async redirect() {
      return '/dashboard';
    },
  },
  pages: {
    // signIn: '/login',
  }
}

export default NextAuth(authOptions);
