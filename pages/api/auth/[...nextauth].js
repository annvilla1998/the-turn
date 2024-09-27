import NextAuth from 'next-auth';
// import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>',
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Add logic to verify credentials here
        if (!credentials) return null;
        const { email, password } = credentials;
        // Fetch user and password hash from database
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (user) {
          return SignInUser({ password, user });
        } else {
          throw new Error('This email does not exist.');
        }
      },
    }),
  ],
  //   callbacks: {
  //     async session({ session, token }) {
  //       let user = await prisma.user.findUnique({
  //         where: {
  //           id: token.sub,
  //         },
  //       });
  //       session.user.id = token.sub;
  //       session.user.role = user.role;
  //       token.role = user.role;
  //       return session;
  //     },
  //   },
  //   pages: {
  //     'sign-in': '/sign-in',
  //   },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60,
  },
  secret: process.env.JWT_SECRET,
});

const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('Please enter your password.');
  }
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error('Email or password is wrong!');
  }
  return user;
};
