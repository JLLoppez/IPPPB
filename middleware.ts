import { NextRequest, NextResponse } from 'next/server';

const supported = ['pt', 'en', 'fr', 'es'];

function detectLang(header: string | null) {
  const lower = (header || '').toLowerCase();
  if (lower.startsWith('pt')) return 'pt';
  if (lower.startsWith('fr')) return 'fr';
  if (lower.startsWith('es')) return 'es';
  return 'en';
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const queryLang = req.nextUrl.searchParams.get('lang');
  if (queryLang && supported.includes(queryLang)) {
    res.cookies.set('lang', queryLang, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  if (!req.cookies.get('lang')) {
    const detected = detectLang(req.headers.get('accept-language'));
    res.cookies.set('lang', detected, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api/language).*)'],
};
