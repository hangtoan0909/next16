import { backendApi } from '@/api/axios';
import { RESPONSE_CODE } from '@/constants';
import { STORAGE_KEYS } from '@/constants/app';
import { ApiError, ResponseData, SignInDataType, SignInPayloadType } from '@/types';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body: SignInPayloadType = await req.json();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const acceptLanguage = req.headers.get('accept-language');
    if (acceptLanguage) headers['Accept-Language'] = acceptLanguage;

    const authorization = req.headers.get('authorization');
    if (authorization) headers.Authorization = authorization;

    const data = await backendApi.post<SignInPayloadType, ResponseData<SignInDataType>>(
      '/auth/admin/login/verify-otp',
      body,
      {
        skipAuthRefresh: true,
        headers,
      }
    );

    const res = NextResponse.json(data);

    if (data.data.refreshToken) {
      const decode = jwtDecode<{ exp: number }>(data.data.refreshToken);
      if (!decode.exp) throw new Error('Refresh token missing exp');

      res.cookies.set(STORAGE_KEYS.REFRESH_TOKEN, data.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: dayjs.unix(decode.exp).toDate(),
      });
    }

    return res;
  } catch (err) {
    const error = err as ApiError;
    return NextResponse.json(error.data || { message: 'Verify OTP failed' }, {
      status: error.data?.status || RESPONSE_CODE.SERVER_ERROR,
    });
  }
}
