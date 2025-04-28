interface ApplicationStatusBadgeProps {
  status: "서류통과" | "완수완료" | "불합격" | "면접예정"; // status 값에 리터럴 타입 지정
}

export const ApplicationStatusBadge = ({
  status,
}: ApplicationStatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "서류통과":
        return "bg-blue-100 text-blue-800";
      case "완수완료":
        return "bg-green-100 text-green-800";
      case "불합격":
        return "bg-red-100 text-red-800";
      case "면접예정":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
};
