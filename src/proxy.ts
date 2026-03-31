import { jwtDecode } from 'jwt-decode';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_ROUTES, PUBLIC_ROUTES, ROLE, ROUTER_PATH, SPECICAL_USER_ROUTES, STORAGE_KEYS } from './constants';
import { routing } from './i18n/routing';
import { JWTPayload } from './types';

const roleRedirectMap: Record<ROLE, string> = {
  [ROLE.USER]: ROUTER_PATH.USER.HOME,
  [ROLE.INSPECTION]: ROUTER_PATH.INSPECTION.DASHBOARD,
  [ROLE.SYSTEM_ADMIN]: ROUTER_PATH.ADMIN.DASHBOARD,
};

const rolePrefixMap: Record<ROLE, string> = {
  [ROLE.USER]: ROUTER_PATH.USER.ROOT,
  [ROLE.INSPECTION]: ROUTER_PATH.INSPECTION.ROOT,
  [ROLE.SYSTEM_ADMIN]: ROUTER_PATH.ADMIN.ROOT,
};

function getRoleFromToken(accessToken?: string): ROLE {
  if (!accessToken) return ROLE.USER;
  try {
    return jwtDecode<JWTPayload>(accessToken).role;
  } catch {
    return ROLE.USER;
  }
}

function getLocale(pathname: string): string {
  return (
    routing.locales.find((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) || routing.defaultLocale
  );
}

const clearAuthCookies = (res: NextResponse) => {
  res.cookies.set(STORAGE_KEYS.ACCESS_TOKEN, '', { maxAge: 0, path: '/' });
  res.cookies.set(STORAGE_KEYS.REFRESH_TOKEN, '', { maxAge: 0, path: '/' });
  res.cookies.set(STORAGE_KEYS.USER_NEED_PROFILE, '', { maxAge: 0, path: '/' });
};

function normalizePathname(pathname: string): string {
  const withoutLocale = routing.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
    ? pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '')
    : pathname;

  if (withoutLocale.length > 1 && withoutLocale.endsWith('/')) {
    return withoutLocale.slice(0, -1);
  }

  return withoutLocale;
}

function matchRoutes(pathname: string, routes: string[]): boolean {
  const normalizedPath = normalizePathname(pathname);

  return routes.some((route) => {
    const normalizedRoute = route !== '/' && route.endsWith('/') ? route.slice(0, -1) : route;
    if (normalizedRoute === '/') return normalizedPath === '/';
    return normalizedPath === normalizedRoute || normalizedPath.startsWith(`${normalizedRoute}/`);
  });
}

export default async function middleware(req: NextRequest) {
  const intl = createMiddleware(routing);

  const { cookies, nextUrl } = req;
  const { pathname } = nextUrl;

  const locale = getLocale(pathname);

  const redirect = (to: string) => {
    const base = locale === routing.defaultLocale ? '' : `/${locale}`;
    return NextResponse.redirect(new URL(`${base}${to}`, req.url));
  };

  const isAuth = cookies.has(STORAGE_KEYS.REFRESH_TOKEN);
  const accessToken = cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;

  const role = getRoleFromToken(accessToken);
  const redirectPath = roleRedirectMap[role];
  const allowedPrefix = rolePrefixMap[role];

  const needProfile = cookies.has(STORAGE_KEYS.USER_NEED_PROFILE);

  const isAuthPage = matchRoutes(pathname, AUTH_ROUTES);
  const isPublicPage = matchRoutes(pathname, PUBLIC_ROUTES);
  const isUserSignUpPage = matchRoutes(pathname, [ROUTER_PATH.USER.AUTH.SIGN_UP]);

  // Public route (hoặc user vào sign-in) → bỏ qua check
  if (isPublicPage) return intl(req);

  // Đã login
  if (isAuth) {
    // 1) nếu đang needProfile → clear token nhưng vẫn cho đi tiếp
    if (role === ROLE.USER && needProfile) {
      if (!isUserSignUpPage) {
        const res = intl(req);
        clearAuthCookies(res);
        return res;
      }
      return intl(req);
    }

    // 2) nếu không needProfile + user + sign up -> redirect
    if (role === ROLE.USER && isUserSignUpPage && !needProfile) {
      return redirect(redirectPath);
    }

    // 3) đã login nhưng vào auth page
    if (isAuthPage) return redirect(redirectPath);

    // 4) partner/admin vào route chỉ dành cho user
    if (role !== ROLE.USER && SPECICAL_USER_ROUTES.includes(pathname)) {
      return redirect(redirectPath);
    }

    // 5) đã login nhưng vào sai prefix theo role
    if (accessToken && allowedPrefix && !pathname.startsWith(allowedPrefix)) {
      return redirect(redirectPath);
    }

    return intl(req);
  }

  // Chưa login mà vào trang cần auth
  if (!isAuthPage) {
    if (pathname.startsWith(ROUTER_PATH.ADMIN.ROOT)) return redirect(ROUTER_PATH.ADMIN.AUTH.SIGN_IN);
    if (pathname.startsWith(ROUTER_PATH.INSPECTION.ROOT)) return redirect(ROUTER_PATH.INSPECTION.AUTH.SIGN_IN);
    return redirect(redirectPath);
  }

  return intl(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
