import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/admin", "/business", "/personal/mypage", "/chat"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  // 로그인 안된 경우
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 토큰 디코드하여 role 검사
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const role = decoded.role?.toLowerCase();

    // 경로별 role 인가 제한
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    if (pathname.startsWith("/business") && role !== "business") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    if (pathname.startsWith("/personal/mypage") && role !== "personal") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    // /chat은 로그인만 되어 있으면 허용
  } catch (e) {
    return NextResponse.redirect(new URL("/login", request.url)); // 디코딩 실패 시 로그인으로
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
