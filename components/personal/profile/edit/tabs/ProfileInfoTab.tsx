"use client"

import { useState } from "react"
import { Camera, MapPin, User, Mail, Phone, Calendar, Search } from "lucide-react"
import Image from "next/image"

export const ProfileInfoTab = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">프로필 이미지</h2>
      <div className="mb-8 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-gray-100 relative mb-2 flex items-center justify-center overflow-hidden">
          {profileImage ? (
            <Image src={profileImage || "/images/etc/placeholder.svg"} alt="Profile" layout="fill" objectFit="cover" />
          ) : (
            <User className="h-16 w-16 text-gray-300" />
          )}
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer"
          >
            <Camera className="h-4 w-4 text-white" />
            <input
              id="profile-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const reader = new FileReader()
                  reader.onload = (event) => {
                    if (event.target?.result) {
                      setProfileImage(event.target.result as string)
                    }
                  }
                  reader.readAsDataURL(e.target.files[0])
                }
              }}
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 text-center">
          프로필 이미지는 JPG, PNG 형식으로 최대 5MB까지 업로드할 수 있습니다.
          <br />
          이미지는 정사각형으로 자동 조정됩니다.
        </p>
      </div>

      <h2 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h2>
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              이름 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="홍길동"
                defaultValue="홍길동"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              이메일 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="hong@example.com"
                defaultValue="hong@example.com"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              전화번호 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="010-1234-5678"
                defaultValue="010-1234-5678"
              />
            </div>
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              성별
            </label>
            <select
              id="gender"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue="남성"
            >
              <option value="남성">남성</option>
              <option value="여성">여성</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">
            생년월일
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="date"
              id="birthdate"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue="1990-01-01"
            />
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium text-gray-900 mb-4">주소 정보</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <div className="w-full max-w-[200px]">
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
              우편번호
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                id="zipcode"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="06236"
                defaultValue="06236"
                readOnly
              />
            </div>
          </div>
          <div className="pt-6">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Search className="h-4 w-4 mr-1" />
              검색
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            주소
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="address"
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="서울특별시 강남구 테헤란로 152"
              defaultValue="서울특별시 강남구 테헤란로 152"
              readOnly
            />
          </div>
        </div>

        <div>
          <label htmlFor="addressDetail" className="block text-sm font-medium text-gray-700 mb-1">
            상세주소
          </label>
          <input
            type="text"
            id="addressDetail"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="강남비지니스센터 12층"
            defaultValue="강남비지니스센터 12층"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}
