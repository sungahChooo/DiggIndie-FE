// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  console.log('refresh token', refreshToken);

  // 로그인 상태인데 로그인/회원가입 페이지에 접근하는 경우 (차단)
  // if (refreshToken && pathname.startsWith('/auth')) {
  //   if (pathname.includes('/callback')) {
  //     return NextResponse.next();
  //   }
  //   console.log('로그인 상태이므로 메인으로 리다이렉트');
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // 로그인 안 됐는데 마이페이지, 글쓰기 페이지에 접근하는 경우
  if (!refreshToken && (pathname.startsWith('/my') || pathname.startsWith('/community/write'))) {
    console.log('미로그인 상태이므로 로그인 페이지로 리다이렉트');
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정 (모든 경로에서 실행되되, 정적 파일은 제외)
export const config = {
  matcher: [
    /*
     * 아래 경로를 제외한 모든 요청 경로에 미들웨어 적용:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
