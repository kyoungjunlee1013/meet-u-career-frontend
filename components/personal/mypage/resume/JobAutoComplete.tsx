import { useState, useRef, useEffect } from "react";
import { apiClient } from "@/api/apiClient";

interface JobAutoCompleteOption {
  label: string;
  value: number;
}
interface JobAutoCompleteProps {
  value: JobAutoCompleteOption | null;
  onChange: (option: JobAutoCompleteOption | null) => void;
}

export function JobAutoComplete({ value, onChange }: JobAutoCompleteProps) {
  const [options, setOptions] = useState<JobAutoCompleteOption[]>([]);
  const [inputValue, setInputValue] = useState<string>(value?.label || "");
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(value?.label || "");
  }, [value]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setInputValue(keyword);
    // 입력 시 label만 전달, id는 undefined로 리셋
    onChange(keyword ? { label: keyword, value: undefined as any } : null);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (keyword.length >= 2) {
      timeoutRef.current = setTimeout(() => {
        apiClient.get(`/api/job-categories/search?keyword=${encodeURIComponent(keyword)}`)
          .then(res => setOptions((res.data.data || []).map((item: any) => ({ label: item.label, value: item.id }))));
        setShow(true);
      }, 300);
    } else {
      setOptions([]);
      setShow(false);
    }
  };

  // blur 시 드롭다운만 닫도록 변경
  const handleBlur = () => {
    setShow(false);
  };

  return (
    <div className="relative">
      <input
        value={inputValue}
        onChange={handleInput}
        onBlur={handleBlur}
        placeholder="희망 직무 입력"
        className="mt-1 w-full border rounded px-2 py-2"
        autoComplete="off"
      />
      {show && options.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow">
          {options.map(opt => (
            <li
              key={opt.value}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onMouseDown={() => {
                setInputValue(opt.label);
                onChange(opt);
                setShow(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
