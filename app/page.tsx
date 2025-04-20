"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/components/home/Header";
import { LoginHeader } from "@/components/home/LoginHeader";
import { MainNavigation } from "@/components/home/MainNavigation";
import { SearchBar } from "@/components/home/SearchBar";
import { PopularJobs } from "@/components/home/PopularJobs";
import { MostAppliedJobs } from "@/components/home/MostAppliedJobs";
import { LatestJobs } from "@/components/home/LatestJobs";
import { Footer } from "@/components/home/Footer";
import { useUserStore } from "@/store/useUserStore";
import type { JobProps } from "@/types/job";

interface ResponseProps {
  data: {
    popular: JobProps[];
    latest: JobProps[];
    mostApplied: JobProps[];
  };
}

export default function HomePage() {
  const { userInfo, isUserInfoHydrated } = useUserStore();
  const [popular, setPopular] = useState<JobProps[]>([]);
  const [latest, setLatest] = useState<JobProps[]>([]);
  const [mostApplied, setMostApplied] = useState<JobProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get<ResponseProps>("/api/main/default")
      .then((response) => {
        setPopular(response.data.data.popular || []);
        setLatest(response.data.data.latest || []);
        setMostApplied(response.data.data.mostApplied || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  if (!isUserInfoHydrated) {
    return null; // 아직 복구 중이면 화면 그리지 않음
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {userInfo ? <LoginHeader /> : <Header />}
      <MainNavigation />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 w-full">
        <SearchBar />
        <PopularJobs popular={popular} isLoading={isLoading} />
        <LatestJobs latest={latest} isLoading={isLoading} />
        <MostAppliedJobs mostApplied={mostApplied} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
}