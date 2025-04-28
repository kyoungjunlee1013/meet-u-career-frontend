"use client";

import { useState } from "react";
import Link from "next/link";
import { PromotionalCarousel } from "./PromotionalCarousel";
import { BusinessRegistrationForm } from "./BusinessRegistrationForm";

interface RegisterTabsProps {
  onCreateIdClick: () => void;
}

export const RegisterTabs = ({ onCreateIdClick }: RegisterTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("personal");

  const handleTabChange = (tab: "personal" | "business") => {
    setActiveTab(tab);

    if (tab === "personal") {
      onCreateIdClick();
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[calc(100vh-56px)]">
      {activeTab === "business" ? (
        <div className="w-full flex justify-center">
          <BusinessRegistrationForm />
        </div>
      ) : (
        <>
          {/* Left side - Registration tabs */}
          <div className="w-full md:w-1/2 flex items-center justify-center py-10 md:py-0">
            <div className="max-w-md w-full px-6">
              <div className="flex border-b mb-10">
                <button
                  className={`flex-1 py-4 text-center font-medium text-xl ${
                    activeTab === "personal"
                      ? "text-blue-600 border-b-4 border-blue-600"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                  onClick={() => handleTabChange("personal")}
                >
                  개인회원
                </button>
                <button
                  className={`flex-1 py-4 text-center font-medium text-xl ${
                    activeTab === "business"
                      ? "text-blue-600 border-b-4 border-blue-600"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                  onClick={() => handleTabChange("business")}
                >
                  기업회원
                </button>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-mds text-gray-500 hover:underline"
                >
                  이미 계정이 있나요? 로그인
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Promotional carousel */}
          <div className="hidden md:block w-1/2 bg-blue-50 h-full">
            <PromotionalCarousel />
          </div>
        </>
      )}
    </div>
  );
};
