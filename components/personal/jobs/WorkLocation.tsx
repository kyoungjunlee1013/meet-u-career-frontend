"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { MapPin, Map } from "lucide-react";

declare global {
    interface Window {
        kakao: any;
    }
}

interface WorkLocationProps {
    sectionRef: RefObject<HTMLDivElement | null>;
    address: string;
}

export const WorkLocation = ({ sectionRef, address }: WorkLocationProps) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const toggleMap = () => {
        setIsMapOpen((prev) => !prev);
    };

    useEffect(() => {
        if (isMapOpen && mapContainerRef.current) {
            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY}&libraries=services&autoload=false`;
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                window.kakao.maps.load(() => {
                    const container = mapContainerRef.current;

                    if (!container) return;

                    // 1. 지도 초기화 (경복궁 중심)
                    const mapOption = {
                        center: new window.kakao.maps.LatLng(37.579617, 126.977041),
                        level: 3,
                    };
                    const map = new window.kakao.maps.Map(container, mapOption);

                    // 2. 주소-좌표 변환 객체 생성
                    const geocoder = new window.kakao.maps.services.Geocoder();

                    // 3. props.address를 사용해서 주소 검색
                    geocoder.addressSearch(address, function (result: any, status: any) {
                        if (status === window.kakao.maps.services.Status.OK) {
                            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                            // 4. 마커 생성
                            const marker = new window.kakao.maps.Marker({
                                map: map,
                                position: coords,
                            });

                            // 5. 마커가 지도 위에 표시되도록 설정합니다
                            marker.setMap(map);

                            // 6. 지도 중심 이동
                            map.setCenter(coords);
                        } else {
                            console.error('주소 검색 실패:', status);
                        }
                    });
                });
            };

            return () => {
                document.head.removeChild(script);
            };
        }
    }, [isMapOpen, address]);

    return (
        <div ref={sectionRef} className="border-t pt-8 mb-12">
            {/* 제목 */}
            <h3 className="text-lg font-bold mb-2 text-left">근무지 위치</h3>

            {/* 카드 전체 */}
            <div className="border rounded-md overflow-hidden">
                {/* 주소 영역 */}
                <div className="flex items-center p-6 bg-white">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-800">
                        (24465) 강원 춘천시 버들1길 130
                    </span>
                </div>

                {/* 구분선 */}
                <div className="border-t"></div>

                {/* 지도 보기/닫기 버튼 */}
                <button
                    onClick={toggleMap}
                    className="flex justify-center items-center py-4 w-full bg-white hover:bg-gray-50 text-sm text-gray-500"
                >
                    <Map className="w-4 h-4 text-gray-400 mr-1" />
                    {isMapOpen ? "지도 닫기" : "지도 보기"}
                </button>

                {/* 지도 영역 (부드러운 슬라이드 처리) */}
                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isMapOpen ? "max-h-[500px]" : "max-h-0"}`}
                >
                    <div ref={mapContainerRef} className="w-full h-[320px]" />
                </div>
            </div>
        </div>
    );
};
