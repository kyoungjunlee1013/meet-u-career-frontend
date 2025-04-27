import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // 로그인 제외 예외 처리
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const protectedPaths = ["/admin", "/business", "/personal/mypage", "/chat"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

  // 로그인 안된 경우
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const role = decoded.role?.toLowerCase();

    // 관리자 및 슈퍼관리자 권한 체크
    if (
      pathname.startsWith("/admin") &&
      !(role === "admin" || role === "super")
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    // 기업회원 권한 체크
    if (pathname.startsWith("/business") && role !== "business") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    // 개인회원 마이페이지 권한 체크
    if (pathname.startsWith("/personal/mypage") && role !== "personal") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    // /chat: 로그인만 되어 있으면 허용

  } catch (e) {
    // 토큰 디코딩 오류 또는 만료 시 로그인 페이지로
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/business/:path*",
    "/personal/mypage/:path*",
    "/chat/:path*",
  ],
};
