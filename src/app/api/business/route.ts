import { NextRequest, NextResponse } from 'next/server';

const INVALID_KEYWORDS = ['등록되지 않은', '폐업', '존재하지'];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();

  if (!q) {
    return NextResponse.json({ message: 'Missing query parameter' }, { status: 400 });
  }

  const apiKey = process.env.BIZNO_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ message: 'API key not found' }, { status: 500 });
  }

  try {
    const url = `https://bizno.net/api/fapi?key=${apiKey}&gb=1&q=${q}&type=json`;

    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Failed to fetch Bizno API' }, { status: response.status });
    }

    const data = await response.json();

    const item = data?.items?.[0];

    if (!item) {
      return NextResponse.json({ message: '대표자명이 올바르지 않습니다' }, { status: 400 });
    }

    const isInvalid = INVALID_KEYWORDS.some((keyword) => item.taxtype?.includes(keyword));

    if (isInvalid) {
      return NextResponse.json({ message: '대표자명이 올바르지 않습니다' }, { status: 400 });
    }

    return NextResponse.json(
      {
        company: item.company,
        raw: item,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json({ message }, { status: 500 });
  }
}
