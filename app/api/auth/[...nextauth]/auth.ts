import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        if (account.id_token) token.idToken = account.id_token; // OIDC ID Token
        if (account.access_token) token.accessToken = account.access_token; // Google Access Token
      }
      return token;
    },
    async session({ session }) {
      // id/access token은 클라 노출하지 않기 위해 세션에 넣지 않음
      return session;
    },
  },
});
