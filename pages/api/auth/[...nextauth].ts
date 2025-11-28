import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Dummy credentials/authorization
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'V9 Credentials',
      credentials: {
        username: { label: 'TempUsername', type: 'text', placeholder: 'v9p' },
        password: { label: 'TempPassword', type: 'password' },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        // If ADMIN credentials are set in env, validate them
        const adminUser = process.env.ADMIN_USERNAME;
        const adminPass = process.env.ADMIN_PASSWORD;
        if (adminUser && adminPass) {
          if (credentials?.username === adminUser && credentials?.password === adminPass) {
            return {
              id: 1,
              name: 'Admin',
              email: process.env.ADMIN_EMAIL ?? 'admin@example.com',
              role: 'admin',
            };
          }
          return null;
        }
        // fallback: return a default visitor user for development/test only.
        return { id: 1, name: 'Visitor', email: 'visitor@example.com' };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = (user as any).role ?? 'user';
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user = session.user || {};
      // @ts-ignore
      session.user.role = (token as any).role ?? 'user';
      return session;
    },
  },
};

export default NextAuth(authOptions);
