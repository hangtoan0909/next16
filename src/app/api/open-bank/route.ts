import { NextRequest, NextResponse } from 'next/server';

/**
 * Chaba bank_tran_id rule:
 * [InstitutionCode(10)] + U + [Unique(9)]
 * Ex: F123456789U4BC34239Z
 */
function generateBankTranId() {
  const institutionCode = process.env.CHABA_INSTITUTION_CODE;

  if (!institutionCode || institutionCode.length !== 10) {
    throw new Error('Invalid CHABA institution code');
  }

  /**
   * HHmmssSSS (9 digits)
   * Example: 142305123
   * → unique trong cùng ngày
   */
  const now = new Date();
  const unique =
    now.getHours().toString().padStart(2, '0') +
    now.getMinutes().toString().padStart(2, '0') +
    now.getSeconds().toString().padStart(2, '0') +
    now.getMilliseconds().toString().padStart(3, '0');

  return `${institutionCode}U${unique}`;
}

function generateTranDtime() {
  const now = new Date();

  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const HH = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  return `${yyyy}${MM}${dd}${HH}${mm}${ss}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { account_num, account_holder_info, account_holder_info_type, bank_code_std } = body;

    if (!account_num || !account_holder_info || !bank_code_std) {
      return NextResponse.json({ message: 'Missing required body parameters' }, { status: 400 });
    }

    const accessToken = process.env.OPENBANKING_ACCESS_TOKEN;

    if (!accessToken) {
      return NextResponse.json({ message: 'OpenBanking access token not found' }, { status: 500 });
    }

    const bank_tran_id = generateBankTranId();
    const tran_dtime = generateTranDtime();

    const payload = {
      bank_tran_id,
      tran_dtime,
      account_num,
      account_holder_info,
      bank_code_std,
      ...(account_holder_info_type ? { account_holder_info_type } : {}),
    };

    const response = await fetch('https://testapi.openbanking.or.kr/v2.0/inquiry/real_name', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: 'Verify business bank failed',
          error: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        tran_dtime,
        bank_tran_id,
        result: data,
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message }, { status: 500 });
  }
}
