import { RESPONSE_CODE, ROUTER_PATH, STORAGE_KEYS } from '@/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(STORAGE_KEYS.REFRESH_TOKEN)?.value ?? '';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}auth/token/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json().catch(() => ({}));

    const status = res.status;

    // Refresh token invalid -> xoá cookie + trả về 401 cho FE
    if (status === RESPONSE_CODE.UNAUTHORIZED || status === RESPONSE_CODE.PERMISSION) {
      const response = NextResponse.json({ status, message: data?.message ?? 'Token invalid', data: null }, { status });
      response.cookies.set(STORAGE_KEYS.ACCESS_TOKEN, '', { maxAge: 0, path: '/' });
      response.cookies.set(STORAGE_KEYS.REFRESH_TOKEN, '', { maxAge: 0, path: '/' });
      return response;
    }

    // Lỗi khác từ BE
    if (!res.ok) {
      return NextResponse.json({ status, message: data?.message ?? 'Refresh token failed', data: null }, { status });
    }

    // ✅ Thành công
    return NextResponse.json({ status, message: 'Refresh token success', data }, { status });
  } catch {
    // Network error -> clear cookie + redirect home user
    const response = NextResponse.redirect(new URL(ROUTER_PATH.USER.HOME, process.env.NEXT_PUBLIC_APP_URL));
    response.cookies.set(STORAGE_KEYS.ACCESS_TOKEN, '', { maxAge: 0, path: '/' });
    response.cookies.set(STORAGE_KEYS.REFRESH_TOKEN, '', { maxAge: 0, path: '/' });
    return response;
  }
}
