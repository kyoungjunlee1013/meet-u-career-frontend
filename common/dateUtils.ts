/**
 * 만료일 기준 D-Day를 계산해주는 함수
 * @param expirationDate - 만료일 (ISO 문자열)
 * @returns D-n, D-DAY, 마감 문자열
 */
export const calculateDday = (expirationDate: string): string => {
    const today = new Date();
    const expire = new Date(expirationDate);
    const diffTime = expire.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 상시채용 기준 (예: 365일 이상 남은 경우)
    if (diffDays > 365) {
        return "상시 채용";
    }

    if (diffDays > 0) {
        return `D-${diffDays}`;
    } else if (diffDays === 0) {
        return "D-DAY";
    } else {
        return "마감";
    }
};
