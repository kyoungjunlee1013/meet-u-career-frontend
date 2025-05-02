"use client";

import React from "react";

// 임시 매핑 함수들 (실제 구현에 맞게 교체 가능)
const jobCategoryMap: Record<number, string> = {
  1: "IT개발·데이터",
  2: "경영·사무",
  3: "디자인",
};
const salaryCodeMap: Record<number, string> = {
  1: "회사 내규에 따름",
  2: "면접 후 결정",
  3: "협의 가능",
};
const getEdu = (level: any) => {
  const map: Record<string|number, string> = { 0: "학력무관", 1: "고졸", 2: "초대졸", 3: "대졸", 4: "석사", 5: "박사" };
  return map[level] || "-";
};
const getExp = (exp: any) => {
  const map: Record<string|number, string> = { 0: "경력무관", 1: "신입", 2: "경력", 3: "신입/경력" };
  return map[exp] || "-";
};

export function RichTemplate({ data, desc }: { data?: any; desc?: any }) {
  if (!data) {
    return (
      <div className="text-center text-gray-400 py-10">
        미리보기 데이터를 불러올 수 없습니다.<br />
        공고 정보를 입력하거나 저장 후 다시 시도해 주세요.
      </div>
    );
  }
  desc = desc || {};
  desc = desc || {};
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto border space-y-10">
      {/* 상단: 공고 제목만 크게 */}
      <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">{data.title}</h1>

      {/* 1. 모집분야 요약 */}
      <section>
        <div className="font-bold text-blue-700 mb-1">1. 모집분야 요약</div>
        <table className="w-full border mb-2 text-sm">
          <thead className="bg-blue-500">
            <tr>
              <th className="border px-2 py-2 text-white">직무카테고리</th>
              <th className="border px-2 py-2 text-white">산업분야</th>
              <th className="border px-2 py-2 text-white">인원</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-2">{data.industry || '-'}</td>
              <td className="border px-2 py-2">{data.numEmployees || '-'}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 2. 근무 조건 (카드형 3열) */}
      <section>
        <div className="font-bold text-blue-700 mb-3">2. 근무 조건</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 고용형태 */}
          <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="font-bold text-blue-700 mb-1">고용형태</div>
            <div className="text-gray-700">{data.employmentType || '-'}</div>
          </div>
          {/* 급여 */}
          <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="font-bold text-blue-700 mb-1">급여</div>
            <div className="text-gray-700">{salaryCodeMap[data.salaryCode as number] || data.salary || '-'}</div>
          </div>
          {/* 근무지 */}
          <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="font-bold text-blue-700 mb-1">근무지</div>
            <div className="text-gray-700">{data.workplace || '-'}</div>
          </div>
        </div>
      </section>

      {/* 3. 자격 및 우대사항 (BasicTemplate과 동일한 표 구성) */}
      <section>
        <div className="font-bold text-blue-700 mb-3">3. 자격 및 우대사항</div>
        <table className="w-full border mb-2 text-sm">
          <thead className="bg-blue-500">
            <tr>
              <th className="border px-2 py-2 text-white">학력</th>
              <th className="border px-2 py-2 text-white">경력</th>
              <th className="border px-2 py-2 text-white">자격요건</th>
              <th className="border px-2 py-2 text-white">우대사항</th>
              <th className="border px-2 py-2 text-white">비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-2">{getEdu(data.educationLevel)}</td>
              <td className="border px-2 py-2">{getExp(data.experienceLevel)}</td>
              <td className="border px-2 py-2 whitespace-pre-line">{desc.requirements || '-'}</td>
              <td className="border px-2 py-2 whitespace-pre-line">{desc.preference || '-'}</td>
              <td className="border px-2 py-2 whitespace-pre-line">{Array.isArray(data.keyword) && data.keyword.length > 0 ? data.keyword.join(', ') : '-'}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4. 주요 업무 및 복리후생 (카드형 2열) */}
      <section>
        <div className="font-bold text-blue-700 mb-3">4. 주요 업무 및 복리후생</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* 주요 업무 */}
          <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="font-bold text-blue-700 mb-1">주요 업무</div>
            <div className="text-gray-700 whitespace-pre-line">{desc.duties || '-'}</div>
          </div>
          {/* 복리후생 */}
          <div className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center">
            <div className="font-bold text-blue-700 mb-1">복리후생</div>
            <div className="text-gray-700 whitespace-pre-line">{desc.benefits || '-'}</div>
          </div>
        </div>
      </section>

      {/* 5. 전형절차 (스텝 카드형) */}
      <section>
        <div className="font-bold text-blue-700 mb-1">5. 전형절차</div>
        <div className="flex flex-row gap-4 justify-center items-center my-4">
          <div className="bg-blue-100 px-4 py-2 rounded shadow text-blue-700 font-bold text-center">
            STEP1<br /><span className="font-normal text-gray-700">서류전형</span>
          </div>
          <span className="text-2xl text-blue-400">→</span>
          <div className="bg-blue-100 px-4 py-2 rounded shadow text-blue-700 font-bold text-center">
            STEP2<br /><span className="font-normal text-gray-700">면접전형</span>
          </div>
          <span className="text-2xl text-blue-400">→</span>
          <div className="bg-blue-100 px-4 py-2 rounded shadow text-blue-700 font-bold text-center">
            STEP3<br /><span className="font-normal text-gray-700">최종합격</span>
          </div>
        </div>
      </section>

      {/* 6. 접수기간 및 방법 (정보 카드형) */}
      <section>
        <div className="font-bold text-blue-700 mb-1">6. 접수기간 및 방법</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-blue-50 rounded p-4">
            <div className="font-bold text-blue-700">접수기간</div>
            <div>{data.openingDate && data.expirationDate ? `${data.openingDate} ~ ${data.expirationDate}` : '-'}</div>
          </div>
          <div className="bg-blue-50 rounded p-4">
            <div className="font-bold text-blue-700">마감 형식</div>
            <div>{(() => {
  const map: Record<number, string> = { 0: '마감일까지', 1: '상시채용' };
  const closeType = (typeof data.closeType === 'number' && !isNaN(data.closeType)) ? data.closeType : Number(data.closeType);
  return map[closeType] || '-';
})()}</div>
          </div>
          <div className="bg-blue-50 rounded p-4">
            <div className="font-bold text-blue-700">지원 방법</div>
            <div>{data.applyMethod || 'MeetU 온라인 입사지원'}</div>
          </div>
          <div className="bg-blue-50 rounded p-4">
            <div className="font-bold text-blue-700">지원 이메일</div>
            <div>{data.applyEmail || '-'}</div>
          </div>
        </div>
      </section>

    </div>
  );
}
