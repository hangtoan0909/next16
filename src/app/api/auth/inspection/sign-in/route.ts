import { backendApi } from '@/api/axios';
import { RESPONSE_CODE } from '@/constants';
import { STORAGE_KEYS } from '@/constants/app';
import { ApiError, ResponseData, SignInDataType, SignInPayloadType } from '@/types';
import dayjs from 'dayjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body: SignInPayloadType = await req.json();

    const incomingHeaders: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'accept-language') {
        incomingHeaders[key] = value;
      }
    });

    const data = await backendApi.post<SignInPayloadType, ResponseData<SignInDataType>>(
      '/auth/inspection/login',
      body,
      {
        skipAuthRefresh: true,
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
      };

      cookieOptions.expires = dayjs.unix(decode.exp).toDate();

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
