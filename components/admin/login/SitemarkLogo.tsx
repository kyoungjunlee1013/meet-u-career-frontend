import Image from "next/image"

export const SitemarkLogo = () => {
    return (
        <div className="flex items-center">
            <Image
                src="/images/logo/logo_admin.png"
                alt="로고"
                width={120}
                height={35}
                priority
            />
        </div>
    )
}
