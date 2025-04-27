"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface CommunityPaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function CommunityPagination({ currentPage, totalPages, onPageChange }: CommunityPaginationProps) {
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            // If total pages is less than or equal to max pages to show, display all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always include first page
            pages.push(1)

            // Calculate start and end of page range
            let start = Math.max(2, currentPage - 1)
            let end = Math.min(totalPages - 1, currentPage + 1)

            // Adjust if we're at the beginning or end
            if (currentPage <= 2) {
                end = Math.min(totalPages - 1, 4)
            } else if (currentPage >= totalPages - 1) {
                start = Math.max(2, totalPages - 3)
            }

            // Add ellipsis if needed
            if (start > 2) {
                pages.push(-1) // -1 represents ellipsis
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            // Add ellipsis if needed
            if (end < totalPages - 1) {
                pages.push(-2) // -2 represents ellipsis
            }

            // Always include last page
            pages.push(totalPages)
        }

        return pages
    }

    return (
        <div className="flex justify-center mt-6">
            <nav className="flex items-center space-x-1">
                <button
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"
                        }`}
                    aria-label="이전 페이지"
                >
                    <ChevronLeft size={16} />
                </button>

                {getPageNumbers().map((page, index) =>
                    page < 0 ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-2 rounded-md ${currentPage === page ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                                }`}
                            aria-label={`${page} 페이지로 이동`}
                            aria-current={currentPage === page ? "page" : undefined}
                        >
                            {page}
                        </button>
                    ),
                )}

                <button
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-200"
                        }`}
                    aria-label="다음 페이지"
                >
                    <ChevronRight size={16} />
                </button>
            </nav>
        </div>
    )
}
