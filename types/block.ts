export interface BlockedCompanyProps {
    companyId: number;
    companyName: string;
    representativeName: string;
    logoUrl: string;
    address: string;
    createAt: string;
    fetchBlockedCompanies: () => void;
}

export interface BlockControlsProps {
    count: number;
}

export interface BlockedCompanyCardProps {
    company: BlockedCompanyProps;
    fetchBlockedCompanies: () => void;
}