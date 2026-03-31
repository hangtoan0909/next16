import { backendApi } from '@/api/axios';
import { RESPONSE_CODE, STORAGE_KEYS } from '@/constants';
import { ApiError, ResponseData, SocialSignInPayload, UserSignInDataType } from '@/types';
import dayjs from 'dayjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body: SocialSignInPayload = await req.json();

    const incomingHeaders: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'accept-language') {
        incomingHeaders[key] = value;
      }
    });

    const data = await backendApi.post<SocialSignInPayload, ResponseData<UserSignInDataType>>(
      '/auth/user/sns-login',
      body,
      {
        headers: {
          ...incomingHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

    const res = NextResponse.json(data);

    if (data.data.refreshToken) {
      const decode: JwtPayload = jwtDecode(data.data.refreshToken);

      if (!decode.exp) throw new Error('Refresh token does not contain exp');

      const cookieOptions: Parameters<typeof res.cookies.set>[2] = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: dayjs.unix(decode.exp).toDate(),
      };

      res.cookies.set(STORAGE_KEYS.REFRESH_TOKEN, data.data.refreshToken, cookieOptions);
    }

    return res;
  } catch (err) {
    const error = err as ApiError;
    return NextResponse.json(error.data || { message: 'Login failed' }, {
      status: error.data?.status || RESPONSE_CODE.SERVER_ERROR,
    });
  }
}
