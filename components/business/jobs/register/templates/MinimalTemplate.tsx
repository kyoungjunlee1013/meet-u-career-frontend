"use client";

import React from "react";

// 미니멀 템플릿: 모든 필수 필드 포함, 최대한 간결하게 정보 위주
export function MinimalTemplate({ data }: { data?: any }) {
  // 예시 데이터 (실제 연동 전 하드코딩)
  const fallbackJob = {
    companyName: "SGA그룹",
    title: "R&D 개발자",
    jobType: "정규직",
    jobCategoryIds: [1, 3], // 직무카테고리
    industry: "IT·정보통신",
    numEmployees: 2,
    educationLevel: 3, // 대졸
    experienceLevel: 2, // 경력
    duties: "- 단순 API 개발 및 유지보수\n- RESTful API 연동 개발\n- 보안 솔루션 개발",
    requirements: "- 관련 전공자\n- 신입/경력 무관",
    preferences: "- 보안 솔루션 경험자 우대",
    keyword: ["API", "보안", "React"],
    location: "경기도 의왕시 공업로 54, SGA타워",
    benefits: "성과급, 인센티브, 복지선택제, 자기계발 지원, 사내 카페테리아 등",
    salary: "4,000만원~5,000만원",
    salaryCode: 2, // 면접 후 결정
    salaryRange: "4,000~5,000만원",
    employmentType: "정규직",
    workplace: "경기도 의왕시",
    openingDate: "2025-04-21",
    expirationDate: "2025-05-10",
    closeType: 0, // 마감일까지
    applyMethod: "MeetU 온라인 입사지원",
    applyEmail: "hr@sga.co.kr",
    steps: [
      { step: "STEP1", desc: "서류전형" },
      { step: "STEP2", desc: "면접전형" },
      { step: "STEP3", desc: "최종합격" },
    ],
  };
  const job = data || fallbackJob;

  // 매핑 예시 (실제 환경에 맞게 분리 가능)
  const jobCategoryMap = { 1: "IT개발·데이터", 2: "경영·사무", 3: "디자인" };
  const salaryCodeMap = { 1: "회사 내규에 따름", 2: "면접 후 결정", 3: "협의 가능" };
  const educationMap = { 0: "학력무관", 1: "고졸", 2: "초대졸", 3: "대졸", 4: "석사", 5: "박사" };
  const experienceMap = { 0: "신입", 1: "경력", 2: "무관" };
  const closeTypeMap = { 0: "마감일까지", 1: "상시채용" };

  return (
    <div className="max-w-xl mx-auto border border-blue-200 rounded-lg p-6 bg-white shadow-sm">
      {/* 공고 제목 상단에 크게 */}
      <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">{job.title || '-'}</h1>
      {/* 상단: 회사, 직무, 고용형태 */}
      <div className="flex flex-wrap items-baseline gap-2 mb-2">
        <span className="text-blue-700 font-bold text-lg">{job.companyName}</span>
        <span className="text-blue-600 text-sm border border-blue-100 rounded px-2 py-0.5">{job.jobType}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-2 text-sm text-gray-700">
        <span><b>직무카테고리</b>: {Array.isArray(job.jobCategoryIds) ? job.jobCategoryIds.map(id => jobCategoryMap[id] || id).join(', ') : '-'}</span>
        <span><b>산업분야</b>: {job.industry || '-'}</span>
        <span><b>인원</b>: {job.numEmployees || '-'}</span>
      </div>
      <hr className="my-3 border-blue-100" />
      {/* 근무 조건 */}
      <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-700">
        <span><b>고용형태</b>: {job.employmentType || job.jobType || '-'}</span>
        <span><b>근무지</b>: {job.workplace || job.location || '-'}</span>
        <span><b>급여</b>: {job.salaryRange || job.salary || '-'}{job.salaryCode ? ` (${salaryCodeMap[job.salaryCode] || job.salaryCode})` : ''}</span>
      </div>
      <hr className="my-3 border-blue-100" />
      {/* 자격 및 우대사항 */}
      <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-700">
        <span><b>학력</b>: {educationMap[job.educationLevel] || '-'}</span>
        <span><b>경력</b>: {experienceMap[job.experienceLevel] || '-'}</span>
        <span><b>키워드</b>: {Array.isArray(job.keyword) && job.keyword.length > 0 ? job.keyword.join(', ') : '-'}</span>
      </div>
      <div className="mb-2">
        <div className="text-sm text-gray-600 font-semibold mb-1">자격 요건</div>
        <div className="whitespace-pre-line text-gray-800 text-sm">{job.requirements}</div>
      </div>
      <div className="mb-2">
        <div className="text-sm text-gray-600 font-semibold mb-1">우대 사항</div>
        <div className="whitespace-pre-line text-gray-800 text-sm">{job.preferences}</div>
      </div>
      <hr className="my-3 border-blue-100" />
      {/* 주요 업무 및 복리후생 */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-2 mb-2">
        <div className="text-sm text-gray-700"><b>주요 업무</b>: <span className="whitespace-pre-line">{job.duties}</span></div>
        <div className="text-sm text-gray-700"><b>복리후생</b>: <span className="whitespace-pre-line">{job.benefits}</span></div>
      </div>
      <hr className="my-3 border-blue-100" />
      {/* 전형절차 */}
      <div className="flex flex-row gap-4 justify-center items-center my-4">
        {job.steps && job.steps.map((s, i) => (
          <React.Fragment key={s.step}>
            <div className="bg-blue-100 px-4 py-2 rounded shadow text-blue-700 font-bold text-center">
              {s.step}<br /><span className="font-normal text-gray-700">{s.desc}</span>
            </div>
            {i < job.steps.length - 1 && <span className="text-2xl text-blue-400">→</span>}
          </React.Fragment>
        ))}
      </div>
      {/* 접수기간 및 방법 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-sm">
        <div className="bg-blue-50 rounded p-4">
          <div className="font-bold text-blue-700">접수기간</div>
          <div>{job.openingDate && job.expirationDate ? `${job.openingDate} ~ ${job.expirationDate}` : '-'}</div>
        </div>
        <div className="bg-blue-50 rounded p-4">
          <div className="font-bold text-blue-700">마감 형식</div>
          <div>{closeTypeMap[job.closeType] || '-'}</div>
        </div>
        <div className="bg-blue-50 rounded p-4">
          <div className="font-bold text-blue-700">지원 방법</div>
          <div>{job.applyMethod || '-'}</div>
        </div>
        <div className="bg-blue-50 rounded p-4">
          <div className="font-bold text-blue-700">지원 이메일</div>
          <div>{job.applyEmail || '-'}</div>
        </div>
      </div>
    </div>
  );
}
