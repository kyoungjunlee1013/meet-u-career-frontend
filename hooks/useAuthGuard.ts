"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useAuthGuard(
  requiredType: "personal" | "business" | "admin" | "any" = "personal"
) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/personal/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userType = data.data.role?.toLowerCase();

        if (requiredType !== "any" && userType !== requiredType) {
          router.replace("/unauthorized");
        } else {
          setIsChecking(false);
        }
      } catch (e) {
        router.replace("/login");
      }
    };

    fetchUser();
  }, [router, requiredType]);

  return isChecking;
}
