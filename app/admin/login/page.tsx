import { SitemarkLogo } from "@/components/admin/login/SitemarkLogo";
import { LoginForm } from "@/components/admin/login/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center mb-6">
            <SitemarkLogo />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
