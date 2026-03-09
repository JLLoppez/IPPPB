import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { lang } = await req.json();
  const res = NextResponse.json({ ok: true });
  if (['pt','en','fr','es'].includes(lang)) {
    res.cookies.set('lang', lang, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  }
  return res;
}
