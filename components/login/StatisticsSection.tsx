import Image from "next/image"

export const StatisticsSection = () => {
  return (
    <div className="w-full flex justify-center">
      <Image
        src="/images/login/login_02.png"
        alt="로그인 설명 이미지"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto object-contain"
        priority
      />
    </div>
  )
}
