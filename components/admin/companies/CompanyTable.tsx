"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import CompanyDetailModal, { type CompanyDetail } from "./CompanyDetailModal"

type CompanyStatus = "승인됨" | "대기 중" | "거부됨"

type Company = {
  id: number
  name: string
  registrationNumber: string
  status: CompanyStatus
  registrationDate: string
  jobPostings: number
  recruitmentManagers: number
}

// Extended company data for the modal
const companyDetails: Record<number, CompanyDetail> = {
  1: {
    id: 1,
    name: "(주)삼성전자",
    registrationNumber: "123-45-67890",
    status: "승인됨",
    registrationDate: "2023-01-15",
    address: "서울특별시 서초구 서초대로74길 11",
    ceo: "김기남",
    industry: "전자제품 제조업",
    size: "대기업",
    foundedYear: "1969",
    website: "www.samsung.com",
    phone: "02-2255-0114",
    email: "contact@samsung.com",
    description:
      "삼성전자는 글로벌 전자제품 및 반도체 제조업체로, 스마트폰, TV, 메모리 칩 등 다양한 제품을 생산하고 있습니다. 혁신적인 기술과 제품으로 글로벌 시장을 선도하고 있으며, 지속적인 연구개발을 통해 미래 성장 동력을 확보하고 있습니다.",
    jobPostings: 24,
    recruitmentManagers: 5,
  },
  2: {
    id: 2,
    name: "(주)현대자동차",
    registrationNumber: "234-56-78901",
    status: "대기 중",
    registrationDate: "2023-02-20",
    address: "서울특별시 서초구 헌릉로 12",
    ceo: "장재훈",
    industry: "자동차 제조업",
    size: "대기업",
    foundedYear: "1967",
    website: "www.hyundai.com",
    phone: "02-3464-1114",
    email: "contact@hyundai.com",
    description:
      "현대자동차는 대한민국의 대표적인 자동차 제조업체로, 승용차, 상용차, 전기차 등 다양한 차종을 생산하고 있습니다. 글로벌 시장에서 품질과 기술력을 인정받으며 지속적인 성장을 이어가고 있습니다.",
    jobPostings: 0,
    recruitmentManagers: 2,
  },
  3: {
    id: 3,
    name: "(주)네이버",
    registrationNumber: "345-67-89012",
    status: "승인됨",
    registrationDate: "2023-03-10",
    address: "경기도 성남시 분당구 불정로 6",
    ceo: "최수연",
    industry: "인터넷 서비스업",
    size: "대기업",
    foundedYear: "1999",
    website: "www.navercorp.com",
    phone: "031-784-1000",
    email: "contact@navercorp.com",
    description:
      "네이버는 대한민국 최대의 인터넷 기업으로, 검색 엔진, 포털 서비스, 콘텐츠 플랫폼 등 다양한 온라인 서비스를 제공하고 있습니다. 인공지능, 로봇, 자율주행 등 미래 기술 분야에도 적극적으로 투자하고 있습니다.",
    jobPostings: 18,
    recruitmentManagers: 7,
  },
  4: {
    id: 4,
    name: "(주)카카오",
    registrationNumber: "456-78-90123",
    status: "거부됨",
    registrationDate: "2023-04-05",
    address: "제주특별자치도 제주시 첨단로 242",
    ceo: "홍은택",
    industry: "인터넷 서비스업",
    size: "대기업",
    foundedYear: "2006",
    website: "www.kakaocorp.com",
    phone: "02-6718-1082",
    email: "contact@kakaocorp.com",
    description:
      "카카오는 모바일 메신저 카카오톡을 기반으로 다양한 서비스를 제공하는 IT 기업입니다. 모빌리티, 커머스, 콘텐츠, 금융 등 다양한 분야로 사업을 확장하고 있으며, 혁신적인 서비스로 사용자들의 일상을 편리하게 만들고 있습니다.",
    jobPostings: 0,
    recruitmentManagers: 0,
  },
  5: {
    id: 5,
    name: "(주)LG전자",
    registrationNumber: "567-89-01234",
    status: "대기 중",
    registrationDate: "2023-05-12",
    address: "서울특별시 영등포구 여의대로 128",
    ceo: "조주완",
    industry: "전자제품 제조업",
    size: "대기업",
    foundedYear: "1958",
    website: "www.lge.co.kr",
    phone: "02-3777-1114",
    email: "contact@lge.com",
    description:
      "LG전자는 가전제품, 모바일 통신기기, 홈엔터테인먼트 제품 등을 생산하는 글로벌 전자기업입니다. 혁신적인 기술과 디자인으로 고객에게 더 나은 삶을 제공하기 위해 노력하고 있습니다.",
    jobPostings: 0,
    recruitmentManagers: 3,
  },
  6: {
    id: 6,
    name: "(주)SK텔레콤",
    registrationNumber: "678-90-12345",
    status: "승인됨",
    registrationDate: "2023-06-18",
    address: "서울특별시 중구 을지로 65",
    ceo: "유영상",
    industry: "통신업",
    size: "대기업",
    foundedYear: "1984",
    website: "www.sktelecom.com",
    phone: "02-6100-0114",
    email: "contact@sktelecom.com",
    description:
      "SK텔레콤은 대한민국 최대의 이동통신사로, 5G 네트워크, AI, 미디어, 보안 등 다양한 ICT 서비스를 제공하고 있습니다. 디지털 혁신을 선도하며 고객의 디지털 라이프를 풍요롭게 만들고 있습니다.",
    jobPostings: 12,
    recruitmentManagers: 4,
  },
  7: {
    id: 7,
    name: "(주)롯데쇼핑",
    registrationNumber: "789-01-23456",
    status: "대기 중",
    registrationDate: "2023-07-22",
    address: "서울특별시 송파구 올림픽로 300",
    ceo: "김상현",
    industry: "유통업",
    size: "대기업",
    foundedYear: "1979",
    website: "www.lotteshopping.com",
    phone: "02-3213-5000",
    email: "contact@lotteshopping.com",
    description:
      "롯데쇼핑은 백화점, 마트, 슈퍼, 편의점 등 다양한 유통 채널을 운영하는 종합 유통기업입니다. 고객에게 차별화된 쇼핑 경험을 제공하기 위해 온·오프라인 채널을 지속적으로 혁신하고 있습니다.",
    jobPostings: 0,
    recruitmentManagers: 1,
  },
  8: {
    id: 8,
    name: "(주)포스코",
    registrationNumber: "890-12-34567",
    status: "거부됨",
    registrationDate: "2023-08-30",
    address: "서울특별시 강남구 테헤란로 440",
    ceo: "김학동",
    industry: "철강업",
    size: "대기업",
    foundedYear: "1968",
    website: "www.posco.com",
    phone: "02-3457-0114",
    email: "contact@posco.com",
    description:
      "포스코는 세계적인 철강기업으로, 고품질의 철강제품을 생산하여 자동차, 조선, 건설 등 다양한 산업 분야에 공급하고 있습니다. 친환경 기술 개발과 지속가능한 성장을 추구하고 있습니다.",
    jobPostings: 0,
    recruitmentManagers: 0,
  },
  9: {
    id: 9,
    name: "(주)한화",
    registrationNumber: "901-23-45678",
    status: "승인됨",
    registrationDate: "2023-09-14",
    address: "서울특별시 중구 청계천로 86",
    ceo: "김승연",
    industry: "제조업",
    size: "대기업",
    foundedYear: "1952",
    website: "www.hanwha.co.kr",
    phone: "02-729-1881",
    email: "contact@hanwha.com",
    description:
      "한화는 제조·건설, 금융, 서비스·레저 등 다양한 분야에서 사업을 영위하는 글로벌 기업입니다. 특히 태양광 에너지 분야에서 세계적인 경쟁력을 갖추고 있으며, 지속가능한 미래를 위한 혁신을 추구하고 있습니다.",
    jobPostings: 9,
    recruitmentManagers: 3,
  },
  10: {
    id: 10,
    name: "(주)GS리테일",
    registrationNumber: "012-34-56789",
    status: "대기 중",
    registrationDate: "2023-10-05",
    address: "서울특별시 강남구 논현로 508",
    ceo: "허연수",
    industry: "유통업",
    size: "대기업",
    foundedYear: "1971",
    website: "www.gsretail.com",
    phone: "02-2006-3333",
    email: "contact@gsretail.com",
    description:
      "GS리테일은 편의점 GS25, 슈퍼마켓 GS THE FRESH 등을 운영하는 유통 전문기업입니다. 고객 중심의 혁신적인 서비스와 상품으로 고객의 일상을 더욱 편리하고 풍요롭게 만들고 있습니다.",
    jobPostings: 0,
    recruitmentManagers: 2,
  },
}

const companies: Company[] = [
  {
    id: 1,
    name: "(주)삼성전자",
    registrationNumber: "123-45-67890",
    status: "승인됨",
    registrationDate: "2023-01-15",
    jobPostings: 24,
    recruitmentManagers: 5,
  },
  {
    id: 2,
    name: "(주)현대자동차",
    registrationNumber: "234-56-78901",
    status: "대기 중",
    registrationDate: "2023-02-20",
    jobPostings: 0,
    recruitmentManagers: 2,
  },
  {
    id: 3,
    name: "(주)네이버",
    registrationNumber: "345-67-89012",
    status: "승인됨",
    registrationDate: "2023-03-10",
    jobPostings: 18,
    recruitmentManagers: 7,
  },
  {
    id: 4,
    name: "(주)카카오",
    registrationNumber: "456-78-90123",
    status: "거부됨",
    registrationDate: "2023-04-05",
    jobPostings: 0,
    recruitmentManagers: 0,
  },
  {
    id: 5,
    name: "(주)LG전자",
    registrationNumber: "567-89-01234",
    status: "대기 중",
    registrationDate: "2023-05-12",
    jobPostings: 0,
    recruitmentManagers: 3,
  },
  {
    id: 6,
    name: "(주)SK텔레콤",
    registrationNumber: "678-90-12345",
    status: "승인됨",
    registrationDate: "2023-06-18",
    jobPostings: 12,
    recruitmentManagers: 4,
  },
  {
    id: 7,
    name: "(주)롯데쇼핑",
    registrationNumber: "789-01-23456",
    status: "대기 중",
    registrationDate: "2023-07-22",
    jobPostings: 0,
    recruitmentManagers: 1,
  },
  {
    id: 8,
    name: "(주)포스코",
    registrationNumber: "890-12-34567",
    status: "거부됨",
    registrationDate: "2023-08-30",
    jobPostings: 0,
    recruitmentManagers: 0,
  },
  {
    id: 9,
    name: "(주)한화",
    registrationNumber: "901-23-45678",
    status: "승인됨",
    registrationDate: "2023-09-14",
    jobPostings: 9,
    recruitmentManagers: 3,
  },
  {
    id: 10,
    name: "(주)GS리테일",
    registrationNumber: "012-34-56789",
    status: "대기 중",
    registrationDate: "2023-10-05",
    jobPostings: 0,
    recruitmentManagers: 2,
  },
]

interface CompanyTableProps {
  activeTab: string
}

export default function CompanyTable({ activeTab }: CompanyTableProps) {
  const [selectedCompany, setSelectedCompany] = useState<CompanyDetail | null>(null)

  // Filter companies based on active tab
  const filteredCompanies = companies.filter((company) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return company.status === "대기 중"
    if (activeTab === "approved") return company.status === "승인됨"
    return true
  })

  const getStatusBadge = (status: CompanyStatus) => {
    switch (status) {
      case "승인됨":
        return (
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-green-600">승인됨</span>
          </div>
        )
      case "대기 중":
        return (
          <div className="flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            <span className="text-yellow-600">대기 중</span>
          </div>
        )
      case "거부됨":
        return (
          <div className="flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            <span className="text-red-600">거부됨</span>
          </div>
        )
    }
  }

  const handleViewDetails = (companyId: number) => {
    setSelectedCompany(companyDetails[companyId])
  }

  const getActionButtons = (company: Company) => {
    switch (company.status) {
      case "승인됨":
        return (
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-orange-500 text-orange-500 rounded hover:bg-orange-50">
              차단
            </button>
            <button
              onClick={() => handleViewDetails(company.id)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
            >
              <Eye className="w-3 h-3 mr-1" /> 상세
            </button>
          </div>
        )
      case "대기 중":
        return (
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-green-500 text-green-500 rounded hover:bg-green-50">
              승인
            </button>
            <button className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-50">
              거절
            </button>
            <button
              onClick={() => handleViewDetails(company.id)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
            >
              <Eye className="w-3 h-3 mr-1" /> 상세
            </button>
          </div>
        )
      case "거부됨":
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewDetails(company.id)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
            >
              <Eye className="w-3 h-3 mr-1" /> 상세
            </button>
          </div>
        )
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기업명</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                사업자등록번호
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                승인 상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                채용공고
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                채용관리자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.registrationNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(company.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.registrationDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.jobPostings}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.recruitmentManagers}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getActionButtons(company)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && <CompanyDetailModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />}
    </>
  )
}
