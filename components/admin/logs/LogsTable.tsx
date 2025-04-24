// "use client"

// import { Info, X } from "lucide-react"
// import { useState } from "react"

// const logs = [
//   {
//     id: "LOG-1001",
//     userId: "개인: user123",
//     type: "SECURITY",
//     action: "로그인 시도",
//     ip: "192.168.1.1",
//     createdAt: "2023-04-01 17:30:00",
//   },
//   {
//     id: "LOG-1002",
//     userId: "개인: user456",
//     type: "SECURITY",
//     action: "비밀번호 변경",
//     ip: "192.168.1.2",
//     createdAt: "2023-04-01 18:15:00",
//   },
//   {
//     id: "LOG-1003",
//     userId: "기업: company789",
//     type: "TRANSACTION",
//     action: "결제 완료",
//     ip: "192.168.1.3",
//     createdAt: "2023-04-01 19:00:00",
//   },
//   {
//     id: "LOG-1004",
//     userId: "관리자: admin001",
//     type: "SYSTEM",
//     action: "시스템 설정 변경",
//     ip: "192.168.1.4",
//     createdAt: "2023-04-01 20:30:00",
//   },
//   {
//     id: "LOG-1005",
//     userId: "개인: user789",
//     type: "USER",
//     action: "이력서 업로드",
//     ip: "192.168.1.5",
//     createdAt: "2023-04-01 21:45:00",
//   },
//   {
//     id: "LOG-1006",
//     userId: "기업: company123",
//     type: "TRANSACTION",
//     action: "채용공고 등록",
//     ip: "192.168.1.6",
//     createdAt: "2023-04-01 23:00:00",
//   },
//   {
//     id: "LOG-1007",
//     userId: "관리자: admin002",
//     type: "SECURITY",
//     action: "사용자 계정 잠금 해제",
//     ip: "192.168.1.7",
//     createdAt: "2023-04-02 00:30:00",
//   },
//   {
//     id: "LOG-1008",
//     userId: "개인: user234",
//     type: "ERROR",
//     action: "파일 업로드 실패",
//     ip: "192.168.1.8",
//     createdAt: "2023-04-02 01:45:00",
//   },
//   {
//     id: "LOG-1009",
//     userId: "기업: company456",
//     type: "USER",
//     action: "채용자 필터링",
//     ip: "192.168.1.9",
//     createdAt: "2023-04-02 02:30:00",
//   },
//   {
//     id: "LOG-1010",
//     userId: "관리자: admin003",
//     type: "SYSTEM",
//     action: "데이터베이스 백업",
//     ip: "192.168.1.10",
//     createdAt: "2023-04-02 08:00:00",
//   },
// ]

// const getTypeColor = (type: string) => {
//   switch (type) {
//     case "SECURITY":
//       return "bg-orange-100 text-orange-800"
//     case "TRANSACTION":
//       return "bg-green-100 text-green-800"
//     case "SYSTEM":
//       return "bg-blue-100 text-blue-800"
//     case "USER":
//       return "bg-purple-100 text-purple-800"
//     case "ERROR":
//       return "bg-red-100 text-red-800"
//     default:
//       return "bg-gray-100 text-gray-800"
//   }
// }

// export default function LogsTable() {
//   const [selectedLog, setSelectedLog] = useState<(typeof logs)[0] | null>(null)

//   const closeModal = () => {
//     setSelectedLog(null)
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               로그 ID
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               사용자/관리자 ID
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               로그 유형
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               액션
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               IP 주소
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               생성일시
//             </th>
//             <th
//               scope="col"
//               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//             ></th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {logs.map((log) => (
//             <tr key={log.id} className="hover:bg-gray-50">
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-800">{log.id}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.userId}</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <span
//                   className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(log.type)}`}
//                 >
//                   {log.type}
//                 </span>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.ipAddress}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.createdAt}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                 <button
//                   className="text-gray-400 hover:text-gray-600"
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     setSelectedLog(log)
//                   }}
//                 >
//                   <Info className="h-5 w-5" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {selectedLog && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={closeModal}
//         >
//           <div className="bg-white rounded-lg p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
//             <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={closeModal}>
//               <X className="h-5 w-5" />
//             </button>

//             <h2 className="text-xl font-semibold mb-6">로그 상세 정보</h2>

//             <div className="space-y-4">
//               <div>
//                 <p className="text-gray-500 text-sm">로그 ID:</p>
//                 <p className="font-medium">{selectedLog.id}</p>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">사용자/관리자 ID:</p>
//                 <p className="font-medium">{selectedLog.userId}</p>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">로그 유형:</p>
//                 <div className={`px-2 py-1 text-sm font-semibold rounded ${getTypeColor(selectedLog.type)}`}>
//                   {selectedLog.type}
//                 </div>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">액션:</p>
//                 <p className="font-medium">{selectedLog.action}</p>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">IP 주소:</p>
//                 <p className="font-medium">{selectedLog.ipAddress}</p>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">생성일시:</p>
//                 <p className="font-medium">{selectedLog.createdAt}</p>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">상세 내용:</p>
//                 <p className="bg-gray-50 p-3 rounded text-sm">사용자가 로그인에 성공했습니다.</p>
//               </div>

//               <div>
//                 <p className="text-gray-500 text-sm">메타데이터:</p>
//                 <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
//                   {`{
//   "browser": "Chrome",
//   "device": "Desktop",
//   "os": "Windows"
// }`}
//                 </pre>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

import { Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

export interface Log {
  id: string;
  userId: string;
  type: string;
  action: string;
  ipAddress: string;
  createdAt: string;
}

export interface LogsTableProps {
  filter: {
    startDate: string;
    endDate: string;
    logType: string;
    keyword: string;
  };
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "SECURITY":
      return "bg-orange-100 text-orange-800";
    case "TRANSACTION":
      return "bg-green-100 text-green-800";
    case "SYSTEM":
      return "bg-blue-100 text-blue-800";
    case "USER":
      return "bg-purple-100 text-purple-800";
    case "ERROR":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function LogsTable({ filter }: LogsTableProps) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/admin/logs")
      .then((res) => setLogs(res.data.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filter]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  const closeModal = () => setSelectedLog(null);

  const filteredLogs = logs.filter((log) => {
    // filter by selected type if provided
    if (filter.logType && log.type !== filter.logType) {
      return false;
    }
    // filter by date range (inclusive)
    const logDate = log.createdAt?.slice(0, 10); // YYYY-MM-DD
    if (filter.startDate && logDate < filter.startDate) {
      return false;
    }
    if (filter.endDate && logDate > filter.endDate) {
      return false;
    }
    // filter by keyword (userId, action, ipAddress)
    const keyword = filter.keyword.trim().toLowerCase();
    if (keyword) {
      const userId = log.userId?.toLowerCase() || "";
      const action = log.action?.toLowerCase() || "";
      const ip = log.ipAddress?.toLowerCase() || "";
      if (!userId.includes(keyword) && !action.includes(keyword) && !ip.includes(keyword)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredLogs.map((log) => (
            <tr
              key={log.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedLog(log)}
            >
              <td className="px-6 py-4 text-sm font-medium text-amber-800">{log.id}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.userId}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(log.type)}`}>{log.type}</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.action}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.ipAddress}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.createdAt}</td>
              <td className="px-6 py-4 text-right text-sm font-medium">
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={(e) => { e.stopPropagation(); setSelectedLog(log); }}
                >
                  <Info className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedLog.id}</p>
              <p><strong>User:</strong> {selectedLog.userId}</p>
              <p><strong>Type:</strong> {selectedLog.type}</p>
              <p><strong>Action:</strong> {selectedLog.action}</p>
              <p><strong>IP:</strong> {selectedLog.ipAddress}</p>
              <p><strong>Date:</strong> {selectedLog.createdAt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
