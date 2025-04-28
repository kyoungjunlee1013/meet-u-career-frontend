import React from "react";

interface PublicEvent {
  title: string;
  expirationDate: string;
  companyName: string;
}

interface Props {
  events: PublicEvent[];
}

export const PublicUpcomingEventsSidebar: React.FC<Props> = ({ events }) => {
  return (
    <div className="bg-white border rounded-md p-4">
      <h2 className="text-lg font-medium mb-4">다가오는 채용 마감</h2>
      {events.length === 0 ? (
        <div className="text-gray-400 text-sm">표시할 일정이 없습니다</div>
      ) : (
        <ul className="space-y-3">
          {events.map((event, idx) => (
            <li key={idx} className="border-b pb-2 last:border-b-0">
              <div className="font-semibold text-sm">{event.title}</div>
              <div className="text-xs text-gray-500">{event.companyName}</div>
              <div className="text-xs text-blue-600">
                마감일: {event.expirationDate.slice(0, 10)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
