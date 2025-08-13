"use client";

export const SocialLoginButtons = () => {
  const handleSocialLogin = (provider: "kakao" | "naver" | "google") => {
    const origin = window.location.origin;

    const redirect = {
      kakao: `${origin}/login/callback/kakao`,
      naver: `${origin}/login/callback/naver`,
      google: `${origin}/login/callback/google`,
    }[provider];

    // 네이버는 로그아웃 iframe 유지
    if (provider === "naver") {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = "https://nid.naver.com/nidlogin.logout";
      document.body.appendChild(iframe);
      setTimeout(() => {
        window.location.href =
          `https://nid.naver.com/oauth2.0/authorize?` +
          new URLSearchParams({
            response_type: "code",
            client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
            redirect_uri: redirect,
            state: "naver",
          }).toString();
      }, 1000);
      return;
    }

    const urls = {
      kakao:
        `https://kauth.kakao.com/oauth/authorize?` +
        new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
          redirect_uri: redirect,
          response_type: "code",
          prompt: "login",
          state: "kakao",
        }).toString(),

      google:
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          redirect_uri: redirect,
          response_type: "code",
          scope: "email profile",
          state: "google",
          prompt: "select_account",
        }).toString(),
    } as const;

    window.location.href = urls[provider];
  };

  return (
    <div className="flex justify-center gap-3">
      <button onClick={() => handleSocialLogin("kakao")} className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center text-black hover:opacity-90 transition-opacity font-bold text-sm">K</button>
      <button onClick={() => handleSocialLogin("naver")} className="w-10 h-10 rounded-full bg-[#03C75A] flex items-center justify-center text-white hover:opacity-90 transition-opacity font-bold text-sm">N</button>
      <button onClick={() => handleSocialLogin("google")} className="w-10 h-10 rounded-full bg-white border flex items-center justify-center text-black hover:opacity-90 transition-opacity font-bold text-sm">G</button>
    </div>
  );
};
