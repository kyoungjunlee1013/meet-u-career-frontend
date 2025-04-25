"use client";

import { useFormContext } from "react-hook-form";

export function StepOne() {
  const { register, watch } = useFormContext();
  const jobOptions = {
    "개발": ["프론트엔드 개발자", "백엔드 개발자", "풀스택 개발자", "모바일 앱 개발자", "DevOps 엔지니어"],
    "디자인": ["UX 디자이너", "UI 디자이너", "그래픽 디자이너", "BX 디자이너"],
    "기획": ["서비스 기획자", "프로덕트 매니저", "게임 기획자", "마케팅 기획자"],
    "데이터": ["데이터 분석가", "데이터 엔지니어", "머신러닝 엔지니어"],
    "경영/지원": ["인사 담당자", "회계/재무 담당자", "총무 담당자"],
    "영업/마케팅": ["영업 매니저", "마케팅 매니저", "광고 기획자"],
  };
  const jobCategory = watch("jobCategory") as keyof typeof jobOptions | undefined;

  return (
    <div className="flex flex-col h-full w-full max-w-3xl sm:max-w-4xl overflow-visible px-6 sm:px-8 md:px-10 py-6 items-center">
      <div className="w-full space-y-6">
        
        <div>
          <label className="block text-sm font-medium">기업명 <span className="text-red-500">*</span></label>
          <input
            type="text"
            disabled
            {...register("companyName")}
            className="mt-1 w-full border rounded-md p-2 bg-gray-100 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500">기업명은 자동으로 설정됩니다.</p>
        </div>

        <div>
          <label className="block text-sm font-medium">면접 당시 경력 <span className="text-red-500">*</span></label>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center">
              <input type="radio" value="신입" defaultChecked {...register("careerType")} />
              <span className="ml-2">신입</span>
            </label>
            <label className="flex items-center">
              <input type="radio" value="경력" {...register("careerType")} />
              <span className="ml-2">경력</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">직무 카테고리 <span className="text-red-500">*</span></label>
          <select {...register("jobCategory")} className="mt-1 w-full border rounded-md p-2">
            <option value="">선택</option>
            {Object.keys(jobOptions).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">지원 직무 <span className="text-red-500">*</span></label>
          <select {...register("position")} className="mt-1 w-full border rounded-md p-2">
            <option value="">선택</option>
            {jobCategory && jobOptions[jobCategory]?.map((job) => (
              <option key={job} value={job}>{job}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">면접 일자 <span className="text-red-500">*</span></label>
          <div className="flex space-x-4 mt-2">
            <select {...register("year")} className="border rounded-md p-2">
              {Array.from({ length: 4 }, (_, i) => 2022 + i).map((year) => (
                <option key={year} value={year}>{year}년</option>
              ))}
            </select>
            <select {...register("month")} className="border rounded-md p-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>{month}월</option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
