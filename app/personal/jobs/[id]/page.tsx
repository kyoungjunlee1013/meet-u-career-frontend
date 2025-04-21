"use client";

import { use } from "react";
import { useRef } from "react";
import { Header } from "@/components/home/Header";
import { MainNavigation } from "@/components/home/MainNavigation";
import { JobDetailContent } from "@/components/personal/jobs/JobDetailContent";
import { JobSidebar } from "@/components/personal/jobs/JobSidebar";
import { Footer } from "@/components/home/Footer";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = use(params); // <- 여기 use(params)로 언랩해야 함.

  const postRef = useRef<HTMLDivElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="hidden md:block w-16">
              <JobSidebar scrollToSection={{ postRef, applyRef, companyRef }} />
            </div>
            <div className="flex-1">
              <JobDetailContent
                jobId={id}
                sectionRefs={{ postRef, applyRef, companyRef }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
