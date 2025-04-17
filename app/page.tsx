'use client'

import { useEffect, useState } from "react"
import axios, { AxiosResponse } from 'axios'
import type { JobProps } from "@/types/job";
import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { SearchBar } from "@/components/home/SearchBar"
import { PopularJobs } from "@/components/home/PopularJobs"
import { MostAppliedJobs } from "@/components/home/MostAppliedJobs"
import { LatestJobs } from "@/components/home/LatestJobs"
import { Footer } from "@/components/home/Footer"

interface ResponseProps {
  data: {
    popular: JobProps[];
    latest: JobProps[];
    mostApplied: JobProps[];
  };
}

export default function HomePage() {
  const API_URL = "/api/main/default";
  const [popular, setPopular] = useState<JobProps[]>([]);
  const [latest, setLatest] = useState<JobProps[]>([]);
  const [mostApplied, setMostApplied] = useState<JobProps[]>([]);

  useEffect(() => {
    axios.get<ResponseProps>(API_URL)
      .then((response: AxiosResponse<ResponseProps>) => {
        console.log("response.data:", response.data.data);

        if (response.data.data.popular) {
          setPopular(response.data.data.popular);
        }

        if (response.data.data.latest) {
          setLatest(response.data.data.latest);
        }

        if (response.data.data.mostApplied) {
          setMostApplied(response.data.data.mostApplied);
        }
      })
      .catch((error: any) => {
        console.error("error", error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 w-full">
        <SearchBar />
        <PopularJobs popular={popular} />
        <LatestJobs latest={latest} />
        <MostAppliedJobs mostApplied={mostApplied} />
      </main>
      <Footer />
    </div>
  )
}
