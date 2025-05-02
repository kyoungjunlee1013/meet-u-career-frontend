import type { JobPostingFormData } from "../schema";

interface BasicTemplateProps {
  data: JobPostingFormData;
}

// 임시 매핑 (실제 환경에서는 별도 파일/상수/API로 관리)
const jobCategoryMap: Record<number, string> = {
  1: "IT개발·데이터",
  2: "경영·사무",
  3: "디자인",
  // ... (실제 코드에 맞게 추가)
};
const salaryCodeMap: Record<number, string> = {
  1: "회사 내규에 따름",
  2: "면접 후 결정",
  3: "협의 가능",
  // ... (실제 코드에 맞게 추가)
};

export function BasicTemplate({ data }: BasicTemplateProps) {
  // description 객체 분리 처리
  const desc = typeof data.description === "object" && data.description !== null
    ? (data.description as any)
    : { duties: data.description || "-", requirements: "-", preferences: "-", benefits: "-" };

  // 유틸: 코드값 변환(예시)
  const experienceMap: Record<number, string> = { 0: "신입", 1: "경력", 2: "무관" };
  const educationMap: Record<number, string> = { 0: "학력무관", 1: "고졸", 2: "초대졸", 3: "대졸", 4: "석사", 5: "박사" };
  const getExp = (val: any) => {
    const numVal = Number(val);
    if (isNaN(numVal) || !(numVal in experienceMap)) return '-';
    return experienceMap[numVal];
  };
  const getEdu = (val: any) => {
    const numVal = Number(val);
    if (isNaN(numVal) || !(numVal in educationMap)) return '-';
    return educationMap[numVal];
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-10">
      {/* 공고 제목 상단에 크게 */}
      <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">{data.title || '-'}</h1>
      {/* 1. 모집분야 요약 */}
      <div>
        <div className="text-xl font-bold mb-2">1. 모집분야 요약</div>
        <table className="w-full border border-gray-300 mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">직무카테고리</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">산업분야</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">인원</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">{Array.isArray(data.jobCategoryIds) && data.jobCategoryIds.length > 0 ? data.jobCategoryIds.map((id: number) => jobCategoryMap[id] || id).join(', ') : '-'}</td>
              <td className="border px-3 py-2">{data.industry || "-"}</td>
              <td className="border px-3 py-2">0명</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 2. 근무 조건 및 기간 */}
      <div>
        <div className="text-xl font-bold mb-2">2. 근무 조건</div>
        <table className="w-full border border-gray-300 mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">고용형태</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">근무지</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">급여</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">{data.jobType || "-"}</td>
              <td className="border px-3 py-2">{data.locationCode || "-"}</td>
              <td className="border px-3 py-2">{data.salaryRange || '-'}{data.salaryCode ? ` (${salaryCodeMap[data.salaryCode] || data.salaryCode})` : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 3. 자격 및 담당업무 */}
      <div>
        <div className="text-xl font-bold mb-2">3. 자격 및 우대사항</div>
        <table className="w-full border border-gray-300 mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">학력</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">경력</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">자격요건</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">우대사항</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">{getEdu(data.educationLevel)}</td>
              <td className="border px-3 py-2">{getExp(data.experienceLevel)}</td>
              <td className="border px-3 py-2 whitespace-pre-line">{desc.requirements || "-"}</td>
              <td className="border px-3 py-2 whitespace-pre-line">{desc.preferences || "-"}</td>
              <td className="border px-3 py-2 whitespace-pre-line">{Array.isArray(data.keyword) && data.keyword.length > 0 ? data.keyword.join(', ') : '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. 주요 업무 및 복리 후생 */}
      <div>
        <div className="text-xl font-bold mb-2">4. 주요 업무 및 복리 후생</div>
        <table className="w-full border border-gray-300 mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">주요 업무</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">복리 후생</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2 whitespace-pre-line">{desc.duties || "-"}</td>
              <td className="border px-3 py-2 whitespace-pre-line">{desc.benefits || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 5. 전형절차 */}
      <div>
        <div className="text-xl font-bold mb-2">5. 전형절차</div>
        <table className="w-full border border-gray-300 mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">단계</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">STEP1</td>
              <td className="border px-3 py-2">서류전형</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">STEP2</td>
              <td className="border px-3 py-2">면접전형</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">STEP3</td>
              <td className="border px-3 py-2">최종합격</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* 6. 접수기간 및 방법 */}
      <div>
        <div className="text-xl font-bold mb-2">6. 접수기간 및 방법</div>
        <table className="w-full border border-gray-300 mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">접수기간</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">마감 형식</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">지원 방법</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-800">지원 이메일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-3 py-2">{data.openingDate && data.expirationDate ? `${data.openingDate} ~ ${data.expirationDate}` : '-'}</td>
              <td className="border px-3 py-2">{(() => {
  const map: Record<number, string> = { 0: '마감일까지', 1: '상시채용' };
  const closeType = (typeof data.closeType === 'number' && !isNaN(data.closeType)) ? data.closeType : Number(data.closeType);
  return map[closeType] || '-';
})()}</td>
              <td className="border px-3 py-2">{data?.applyMethod || 'MeetU 온라인 입사지원'}</td>
              <td className="border px-3 py-2">{data?.applyEmail || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
