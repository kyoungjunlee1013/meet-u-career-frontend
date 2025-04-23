"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, Building, Check } from "lucide-react";
import { apiClient } from "@/api/apiClient";
import { useUserStore } from "@/store/useUserStore";

interface Company {
  id: number;
  name: string;
  industry: string;
  logo: string;
  size: string;
  location: string;
}

interface BlockCompanyModalProps {
  onClose: () => void;
  fetchBlockedCompanies: () => void;
}

export function BlockCompanyModal({
  onClose,
  fetchBlockedCompanies,
}: BlockCompanyModalProps) {
  const [keyword, setKeyword] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (keyword.length > 1) {
      setIsSearching(true);

      const timeoutId = setTimeout(async () => {
        try {
          const response = await apiClient.post(
            "/api/personal/companyblock/search",
            { keyword }
          );

          const companies = response.data.data.map((company: any) => ({
            id: company.id,
            name: company.name,
            industry: company.industry ?? "업종 정보 없음",
            logo: company.logoUrl ?? "",
            representativeName:
              company.representativeName ?? "대표자명 정보 없음",
            location: company.address ?? "위치 정보 없음",
          }));

          setSearchResults(companies);
        } catch (error) {
          console.error("기업 검색 실패:", error);
        } finally {
          setIsSearching(false);
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [keyword]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const toggleCompanySelection = (company: Company) => {
    if (selectedCompanies.some((c) => c.id === company.id)) {
      setSelectedCompanies(
        selectedCompanies.filter((c) => c.id !== company.id)
      );
    } else {
      if (selectedCompanies.length < 10) {
        setSelectedCompanies([...selectedCompanies, company]);
      }
    }
  };

  // 차단 설정
  const handleSubmit = async () => {
    if (selectedCompanies.length === 0) return;
    setIsSubmitting(true);

    try {
      const companyIds = selectedCompanies.map((company) => company.id);

      await apiClient.post("/api/personal/companyblock/block", {
        companyIds,
      });

      fetchBlockedCompanies();
      onClose();
    } catch (error) {
      console.error("차단 설정 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        aria-modal="true"
        role="dialog"
        aria-labelledby="block-company-modal-title"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2
            id="block-company-modal-title"
            className="text-lg font-semibold text-gray-900"
          >
            차단 기업 추가
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="기업명을 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* Selected Companies */}
          {selectedCompanies.length > 0 && (
            <div className="mt-3">
              <div className="text-sm font-medium text-gray-700 mb-2">
                선택된 기업 ({selectedCompanies.length}/10)
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                  >
                    <span>{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {isSearching ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : keyword && searchResults.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              검색 결과가 없습니다
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-3">
              {searchResults.map((company) => (
                <div
                  key={company.id}
                  onClick={() => toggleCompanySelection(company)}
                  className={`flex items-start p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedCompanies.some((c) => c.id === company.id)
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        {company.name}
                      </h3>
                      {selectedCompanies.some((c) => c.id === company.id) && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {company.industry} | {company.size} | {company.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              기업명을 검색해주세요
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedCompanies.length === 0 || isSubmitting}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              selectedCompanies.length === 0 || isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                처리 중...
              </span>
            ) : (
              "차단하기"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
