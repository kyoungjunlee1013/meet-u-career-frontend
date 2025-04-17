import Link from "next/link"

export const SocialLoginButtons = () => {
  return (
    <div className="flex justify-center gap-3">
      <Link
        href="/auth/naver"
        className="w-10 h-10 rounded-full bg-[#03C75A] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        aria-label="네이버 로그인"
      >
        <span className="font-bold text-sm">N</span>
      </Link>

      <Link
        href="/auth/kakao"
        className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center text-black hover:opacity-90 transition-opacity"
        aria-label="카카오 로그인"
      >
        <span className="font-bold text-sm">K</span>
      </Link>

      <Link
        href="/auth/google"
        className="w-10 h-10 rounded-full bg-white border flex items-center justify-center text-black hover:opacity-90 transition-opacity"
        aria-label="구글 로그인"
      >
        <span className="font-bold text-sm">G</span>
      </Link>

      <Link
        href="/auth/facebook"
        className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        aria-label="페이스북 로그인"
      >
        <span className="font-bold text-sm">F</span>
      </Link>

      <Link
        href="/auth/apple"
        className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        aria-label="애플 로그인"
      >
        <span className="font-bold text-sm">A</span>
      </Link>
    </div>
  )
}
