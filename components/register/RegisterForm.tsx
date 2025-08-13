"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, EyeOff, Eye } from "lucide-react";
import { ConsentItems } from "./ConsentItems";
import { useRouter } from "next/navigation";
import { apiClient } from "@/api/apiClient";

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
        const res = await apiClient.post(
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
    trigger("phone");
  };

  // 생년월일 자동 변환
  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length >= 5) value = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length >= 8) value = value.slice(0, 7) + "-" + value.slice(7, 9);
    setValue("birthday", value);
    trigger("birthday");
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
      const res = await apiClient.post("/api/personal/account/certification", {
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

  const handleVerifyCertification = async () => {
    const domain = selectedDomain === "custom" ? customDomain : selectedDomain;
    const fullEmail = `${emailId}@${domain}`;

    if (!certificationCode) return alert("인증 코드를 입력해 주세요.");
    if (timeLeft <= 0)
      return alert("인증 시간이 만료되었습니다. 인증 코드를 다시 요청해 주세요.");

    try {
      const res = await apiClient.post(
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

  // 회원가입 (수정됨)
  const handleRegister = async () => {
    if (userIdMsg && userIdMsg.includes("이미 존재")) {
      alert("이미 존재하는 아이디입니다. 다른 아이디를 입력해 주세요.");
      return;
    }

    const isValid = await trigger();
    if (!isValid) return alert("필수 입력 항목을 확인해 주세요.");

    const { serviceConsent, privacyConsent } = watch();
    if (!serviceConsent || !privacyConsent) {
      alert("필수 약관에 모두 동의해야 가입할 수 있습니다.");
      return;
    }

    const v = watch();
    const payload = {
      userId: v.userId,
      email: v.email,
      password: v.password,
      phone: v.phone.replace(/-/g, ""), // 숫자만
      name: v.name,
      birthday: v.birthday, // YYYY-MM-DD
      status: 0
    };

    try {
      await apiClient.post("/api/personal/account/signup", payload);
      alert("회원가입이 완료되었습니다!");
      router.push("/");
    } catch (e) {
      console.error(e);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-[600px] mx-auto px-4 py-8">
      {/* ... 기존 UI 렌더링 부분 동일 ... */}
    </div>
  );
};
