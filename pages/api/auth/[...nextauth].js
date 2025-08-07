"use server";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic to verify credentials here
        if (!credentials) return null;
        const { email, password } = credentials;

        // Fetch user and password hash from database
        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        });
        if (user) {
          return SignInUser({ password, user });
        } else {
          throw new Error("Invalid email or password. Please try again.");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When user signs in, add all user properties to the token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.member = user.member;
        token.verified = user.verified;
        token.subscribed = user.subscribed;
        token.unsubscribe_token = user.unsubscribe_token;
        token.unique_str = user.unique_str;
      }
      return token;
    },
    async session({ session, token }) {
      // Copy all properties from token to the session.user
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.member = token.member;
      session.user.verified = token.verified;
      session.user.subscribed = token.subscribed;
      session.user.unsubscribe_token = token.unsubscribe_token;
      session.user.unique_str = token.unique_str;
      return session;
    }
  },
  pages: {
    "sign-in": "/sign-in",
    unauthorized: "/the-turn/unauthorized"
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60
  },
  secret: process.env.JWT_SECRET
};

const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter your password");
  }

  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    member: user.member,
    verified: user.verified,
    subscribed: user.subscribed,
    unsubscribe_token: user.unsubscribe_token,
    unique_str: user.unique_str
  };
};

export default NextAuth(authOptions);
