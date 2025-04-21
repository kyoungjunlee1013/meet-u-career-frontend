"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Info, CheckCircle, EyeOff, Eye } from "lucide-react";
import { ConsentItems } from "./ConsentItems";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    userId: z
      .string()
      .min(4, "4~20자의 영문 또는 숫자만 사용 가능합니다.")
      .max(20, "4~20자의 영문 또는 숫자만 사용 가능합니다.")
      .regex(/^[a-zA-Z0-9]+$/, "4~20자의 영문 또는 숫자만 사용 가능합니다."),
    password: z
      .string()
      .min(8, "8~16자리/영문 대소문자, 숫자, 특수문자 조합")
      .max(16, "8~16자리/영문 대소문자, 숫자, 특수문자 조합")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
        "8~16자리/영문 대소문자, 숫자, 특수문자 조합"
      ),
    confirmPassword: z
      .string()
      .min(8, "8~16자리/영문 대소문자, 숫자, 특수문자 조합")
      .max(16, "8~16자리/영문 대소문자, 숫자, 특수문자 조합")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
        "8~16자리/영문 대소문자, 숫자, 특수문자 조합"
      ),
    phone: z
      .string()
      .min(10, "휴대폰 번호를 입력해주세요")
      .max(13, "휴대폰 번호는 13자 이하로 입력해주세요"),
    email: z.string().email("이메일 주소를 입력해주세요."),
    name: z.string().min(1, "이름을 입력해주세요"),
    birthday: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD 형식으로 입력해주세요"),
    allConsent: z.boolean(),
    serviceConsent: z.boolean(),
    marketingEmailConsent: z.boolean(),
    marketingSmsConsent: z.boolean(),
    privacyConsent: z.boolean(),
    thirdPartyConsent: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      userId: "",
      password: "",
      phone: "",
      email: "",
      name: "",
      birthday: "",
      allConsent: false,
      serviceConsent: false,
      marketingEmailConsent: false,
      marketingSmsConsent: false,
      privacyConsent: false,
      thirdPartyConsent: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userIdMsg, setUserIdMsg] = useState<string | null>(null);
  const [certificationRequested, setCertificationRequested] = useState(false);
  const [certificationCode, setCertificationCode] = useState("");
  const [certificationLoading, setCertificationLoading] = useState(false);
  const [certificationVerified, setCertificationVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [emailId, setEmailId] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [emailError, setEmailError] = useState("");

  const allConsent = watch("allConsent");

  // 아이디 중복 체크
  useEffect(() => {
    const userId = watch("userId");
    if (!userId || userId.length < 4) {
      setUserIdMsg(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await axios.post(
          "/api/personal/account/check/userid",
          null,
          { params: { userId } }
        );
        setUserIdMsg(res.data.msg);
      } catch (error) {
        console.error(error);
        setUserIdMsg("아이디 중복 체크 실패");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [watch("userId")]);

  // 타이머 관리
  useEffect(() => {
    if (certificationRequested && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [certificationRequested, timeLeft]);

  // 휴대폰 자동 변환
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length < 4) {
      setValue("phone", value);
    } else if (value.length < 8) {
      setValue("phone", value.slice(0, 3) + "-" + value.slice(3));
    } else {
      setValue(
        "phone",
        value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7, 11)
      );
    }
    trigger("phone"); // 폰번호 입력할 때마다 실시간 검증 다시 실행
  };

  // 생년월일 자동 변환 + 입력값 확인
  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    if (value.length >= 5) value = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length >= 8) value = value.slice(0, 7) + "-" + value.slice(7, 9);

    // YYYY-MM-DD 형식일 때만 검사
    if (value.length === 10) {
      const inputDate = new Date(value);
      const today = new Date();

      // 오늘 날짜 이후면 막기
      if (inputDate > today) {
        alert("생년월일은 오늘 날짜 이후로 설정할 수 없습니다.");
        setValue("birthday", "");
        return; // 입력 자체를 막음
      }
    }

    setValue("birthday", value);
    trigger("birthday"); // 생년월일 입력할 때마다 실시간 검증 다시 실행
  };

  // 전체 동의
  const handleAllConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setValue("allConsent", checked);
    setValue("serviceConsent", checked);
    setValue("marketingEmailConsent", checked);
    setValue("privacyConsent", checked);
    setValue("marketingSmsConsent", checked);
    setValue("thirdPartyConsent", checked);
  };

  // 개별 약관 체크
  const handleIndividualConsentChange = () => {
    const values = watch();
    const allChecked =
      values.serviceConsent &&
      values.marketingEmailConsent &&
      values.marketingSmsConsent &&
      values.privacyConsent &&
      values.thirdPartyConsent;
    setValue("allConsent", allChecked);
  };

  // 이메일 인증 요청
  const handleCertification = async () => {
    const domain = selectedDomain === "custom" ? customDomain : selectedDomain;
    const fullEmail = `${emailId}@${domain}`;
    const name = watch("name");

    if (!name) return alert("이름을 입력해 주세요.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fullEmail)) {
      setEmailError("올바른 이메일 형식으로 입력해 주세요.");
      return;
    } else {
      setEmailError("");
    }

    try {
      setCertificationLoading(true);
      const res = await axios.post("/api/personal/account/certification", {
        name,
        email: fullEmail,
      });
      if (res.data.count === 1) {
        setValue("email", fullEmail);
        setCertificationRequested(true);
        setTimeLeft(300);
        alert("인증코드가 이메일로 발송되었습니다.");
      } else {
        alert(res.data.msg || "요청 실패");
      }
    } catch {
      alert("이메일 인증 요청 실패");
    } finally {
      setCertificationLoading(false);
    }
  };

  // 인증 코드 검증
  const handleVerifyCertification = async () => {
    const domain = selectedDomain === "custom" ? customDomain : selectedDomain;
    const fullEmail = `${emailId}@${domain}`;

    if (!certificationCode) return alert("인증 코드를 입력해 주세요.");
    if (timeLeft <= 0)
      return alert(
        "인증 시간이 만료되었습니다. 인증 코드를 다시 요청해 주세요."
      );

    try {
      const res = await axios.post(
        "/api/personal/account/certification/verify",
        { email: fullEmail, code: certificationCode }
      );
      if (res.data.count === 1) {
        setCertificationVerified(true);
        setCertificationRequested(false);
        alert("이메일 인증이 완료되었습니다.");
      } else {
        alert(res.data.msg || "인증 실패");
      }
    } catch {
      alert("인증 요청 실패");
    }
  };

  // 회원가입
  const handleRegister = async () => {
    // 아이디 중복 체크 결과 검사 추가
    if (userIdMsg && userIdMsg.includes("이미 존재")) {
      alert("이미 존재하는 아이디입니다. 다른 아이디를 입력해 주세요.");
      return;
    }

    const isValid = await trigger();
    if (!isValid) return alert("필수 입력 항목을 확인해 주세요.");

    // 필수 약관 2개 체크 검사
    const { serviceConsent, privacyConsent } = watch();
    if (!serviceConsent || !privacyConsent) {
      alert(
        "필수 약관(개인회원 약관, 개인정보 수집 및 이용 동의)에 모두 동의해야 가입할 수 있습니다."
      );
      return;
    }

    try {
      await axios.post("/api/personal/account/signup", watch());
      alert("회원가입이 완료되었습니다!");
      router.push("/");
    } catch {
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-[600px] mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold mb-8">
        Meet U 통합 개인회원 가입
      </h1>

      <div className="space-y-6">
        {/* 아이디 입력 */}
        <div>
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            아이디
          </label>
          <input
            type="text"
            id="userId"
            placeholder="4~20자의 영문 또는 숫자"
            className={`w-full px-3 py-2.5 border ${
              errors.userId ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
            autoComplete="off"
            {...register("userId")}
          />
          {errors.userId && (
            <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>
          )}
          {userIdMsg && (
            <p
              className={`text-xs mt-1 ${
                userIdMsg.includes("이미 존재")
                  ? "text-red-500"
                  : "text-blue-600"
              }`}
            >
              {userIdMsg}
            </p>
          )}
        </div>

        {/* 비밀번호 입력 */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            비밀번호
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="8~16자리/영문 대소문자, 숫자, 특수문자 조합"
              className={`w-full px-3 py-2.5 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
              autoComplete="off"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            비밀번호 확인
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="비밀번호를 다시 입력해 주세요"
              className={`w-full px-3 py-2.5 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
              autoComplete="off"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* 이름 입력 */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            placeholder="이름"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoComplete="off"
            {...register("name")}
            disabled={certificationVerified}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* 이메일 입력 + 인증 */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            이메일
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="이메일 아이디"
              className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              disabled={certificationVerified}
            />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-[180px] px-3 py-2.5 border border-gray-300 rounded-md"
              disabled={certificationVerified}
            >
              <option value="">선택</option>
              <option value="naver.com">@naver.com</option>
              <option value="gmail.com">@gmail.com</option>
              <option value="daum.net">@daum.net</option>
              <option value="custom">직접 입력</option>
            </select>
          </div>

          {selectedDomain === "custom" && (
            <input
              type="text"
              placeholder="직접 입력 (예: mydomain.com)"
              className="w-full mt-2 px-3 py-2.5 border border-gray-300 rounded-md"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              disabled={certificationVerified}
            />
          )}

          {/* 이메일 에러 */}
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}

          {/* 인증 완료 문구 */}
          {certificationVerified && (
            <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              이메일 인증 완료
            </div>
          )}

          {/* 이메일 인증 버튼 */}
          {!certificationVerified && (
            <button
              type="button"
              onClick={handleCertification}
              disabled={certificationLoading}
              className={`mt-3 w-full py-2.5 text-sm rounded-md flex items-center justify-center 
          ${
            certificationLoading
              ? "cursor-not-allowed opacity-70 bg-[#1842a3]"
              : "bg-[#1842a3] hover:bg-blue-700"
          } 
          text-white transition-colors`}
            >
              {certificationLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "이메일 인증"
              )}
            </button>
          )}

          {/* 인증 코드 입력 */}
          {certificationRequested && !certificationVerified && (
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                placeholder="인증 코드 입력"
                value={certificationCode}
                onChange={(e) => setCertificationCode(e.target.value)}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <span className="text-red-500 text-xs w-16 text-center">
                {`${String(Math.floor(timeLeft / 60)).padStart(
                  2,
                  "0"
                )}:${String(timeLeft % 60).padStart(2, "0")}`}
              </span>
              <button
                type="button"
                onClick={handleVerifyCertification}
                className="px-3 py-2.5 bg-[#1842a3] text-white rounded-md hover:bg-blue-700 text-sm"
              >
                인증
              </button>
            </div>
          )}
        </div>

        {/* 휴대폰 번호 */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            휴대전화번호
          </label>
          <input
            type="text"
            id="phone"
            placeholder="01000000000"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoComplete="off"
            {...register("phone")}
            onChange={handlePhoneChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* 생년월일 */}
        <div>
          <label
            htmlFor="birthday"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            생년월일
          </label>
          <input
            type="text"
            id="birthday"
            placeholder="YYYYMMDD"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoComplete="off"
            {...register("birthday")}
            onChange={handleBirthdayChange}
          />
          {errors.birthday && (
            <p className="text-red-500 text-xs mt-1">
              {errors.birthday.message}
            </p>
          )}
        </div>

        {/* 약관 동의 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">약관</h3>
          <div className="border rounded-md p-4">
            <ConsentItems
              allConsent={allConsent}
              handleAllConsentChange={handleAllConsentChange}
              register={register}
              handleIndividualConsentChange={handleIndividualConsentChange}
            />
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <button
          type="button"
          onClick={handleRegister}
          className="w-full py-3 bg-[#1842a3] text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};
