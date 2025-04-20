"use client";

const SOCIAL_LOGIN_URLS = {
  kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code&prompt=login&state=kakao`,
  naver: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=naver`,
  google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile&state=google&prompt=select_account`,
};

export const SocialLoginButtons = () => {
  const handleSocialLogin = (provider: "kakao" | "naver" | "google") => {
    if (provider === "naver") {
      // 네이버는 prompt=login을 지원하지 않기 때문에 iframe 로그아웃 먼저 시도
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = "https://nid.naver.com/nidlogin.logout";
      document.body.appendChild(iframe);

      setTimeout(() => {
        window.location.href = SOCIAL_LOGIN_URLS.naver;
      }, 1000);
    } else {
      window.location.href = SOCIAL_LOGIN_URLS[provider];
    }
  };

  return (
    <div className="flex justify-center gap-3">
      <button
        type="button"
        onClick={() => handleSocialLogin("kakao")}
        className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center text-black hover:opacity-90 transition-opacity font-bold text-sm"
      >
        K
      </button>
      <button
        type="button"
        onClick={() => handleSocialLogin("naver")}
        className="w-10 h-10 rounded-full bg-[#03C75A] flex items-center justify-center text-white hover:opacity-90 transition-opacity font-bold text-sm"
      >
        N
      </button>
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        className="w-10 h-10 rounded-full bg-white border flex items-center justify-center text-black hover:opacity-90 transition-opacity font-bold text-sm"
      >
        G
      </button>
    </div>
  );
};
