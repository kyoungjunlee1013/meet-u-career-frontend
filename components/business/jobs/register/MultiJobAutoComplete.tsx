import { useState, useRef } from "react";
import { apiClient } from "@/api/apiClient";

interface JobCategoryOption {
  label: string;
  value: number;
}
interface MultiJobAutoCompleteProps {
  value: JobCategoryOption[];
  onChange: (options: JobCategoryOption[]) => void;
}

export function MultiJobAutoComplete({ value, onChange }: MultiJobAutoCompleteProps) {
  const [options, setOptions] = useState<JobCategoryOption[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setInputValue(keyword);
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

  const handleSelect = (option: JobCategoryOption) => {
    if (!value.find(v => v.value === option.value)) {
      onChange([...value, option]);
    }
    setInputValue("");
    setShow(false);
  };

  const handleRemove = (option: JobCategoryOption) => {
    onChange(value.filter(v => v.value !== option.value));
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-1 mb-1">
        {value.map(opt => (
          <span key={opt.value} className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center text-sm">
            {opt.label}
            <button type="button" className="ml-1 text-blue-500 hover:text-blue-700" onClick={() => handleRemove(opt)}>
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        value={inputValue}
        onChange={handleInput}
        placeholder="직무를 입력하세요"
        className="w-full border rounded px-2 py-2"
        autoComplete="off"
        onFocus={() => {
          if (options.length > 0) setShow(true);
        }}
      />
      {show && options.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-60 overflow-auto">
          {options.map(opt => (
            <li
              key={opt.value}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onMouseDown={() => handleSelect(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
