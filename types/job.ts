export interface JobProps {
    id: string;
    title: string;
    companyName: string;
    industry: string;
    jobType: string;
    salaryRange: string;
    locationCode: string;
    viewCount: number;
    applyCount: number;
    expirationDate: string;
}

export interface JobCardProps {
    index: string;
    title: string;
    company: string;
    hashtag?: string;
    hasImage?: boolean;
    dDay: string;
    thumbnailUrl?: string;
}
