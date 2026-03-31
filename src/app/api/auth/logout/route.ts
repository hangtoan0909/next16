import { RESPONSE_CODE, STORAGE_KEYS } from '@/constants';
import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    const res = NextResponse.json(true);

    res.cookies.set(STORAGE_KEYS.REFRESH_TOKEN, '', { httpOnly: true, path: '/', maxAge: 0 });

    return res;
  } catch {
    return NextResponse.json({ message: 'Logout failed' }, { status: RESPONSE_CODE.SERVER_ERROR });
  }
}
