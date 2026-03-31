import 'next-auth';
import 'next-auth/jwt';

type OAuthProviderId = 'google' | 'kakao' | 'naver';

declare module 'next-auth' {
  interface Session {
    idToken?: string;
    provider?: OAuthProviderId;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    idToken?: string;
    provider?: OAuthProviderId;
  }
}
