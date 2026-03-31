import type { Account, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

type OAuthAccount = Account & {
  access_token?: string;
  id_token?: string;
};

type Provider = 'google' | 'kakao' | 'naver';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { scope: 'openid email profile', prompt: 'select_account' } },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'login',
        },
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      authorization: {
        params: {
          auth_type: 'reprompt',
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      const acc = account as OAuthAccount | null;
      if (!acc) return token;

      const provider = acc.provider as Provider;
      token.provider = provider;
      token.idToken = provider === 'google' ? acc.id_token : acc.access_token;

      return token;
    },

    async session({ session, token }) {
      session.provider = token.provider as Provider | undefined;
      session.idToken = token.idToken as string | undefined;
      return session;
    },
  },
};
