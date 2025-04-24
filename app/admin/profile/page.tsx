"use client";

import AdminHeader from "@/components/admin/layout/AdminHeader";
import { DynamicAdminProfileContent } from "@/utils/dynamic-imports";

export default function AdminProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <DynamicAdminProfileContent />
    </div>
  );
}
