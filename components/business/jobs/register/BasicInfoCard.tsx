import { useFormContext } from "react-hook-form";
import { FormCard } from "./FormCard";
import { FormField } from "./FormField";
import { useState, useRef } from "react";
import { MultiJobAutoComplete } from "./MultiJobAutoComplete";

interface IndustryOptionDTO {
  value: string;
  label: string;
}
interface LocationOptionDTO {
  value: string; // locationCode
  label: string; // 시/군/구 이름
}

const PROVINCES = [
  "서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치시",
  "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도"
];

const JOB_TYPE_OPTIONS = [
  "정규직",
  "계약직",
  "계약직 (정규직 전환가능)",
  "인턴직",
  "인턴직 (정규직 전환가능)",
  "프리랜서",
  "아르바이트",
  "기간제",
  "무기계약직",
  "파트"
];

const SALARY_CODE_OPTIONS = [
  { value: 1, label: "2,000만원 미만" },
  { value: 2, label: "2,000~3,000만원" },
  { value: 3, label: "3,000~4,000만원" },
  { value: 4, label: "4,000~5,000만원" },
  { value: 5, label: "5,000~6,000만원" },
  { value: 6, label: "6,000~7,000만원" },
  { value: 7, label: "7,000~8,000만원" },
  { value: 8, label: "8,000만원 이상" },
  { value: 0, label: "협의/미정" },
];

export function BasicInfoCard() {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    watch,
  } = useFormContext();
  const [industryOptions, setIndustryOptions] = useState<IndustryOptionDTO[]>([]);
  const [industryInput, setIndustryInput] = useState<string>(getValues("industry") || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Location state
  const [province, setProvince] = useState<string>("");
  const [cities, setCities] = useState<LocationOptionDTO[]>([]);
  const [city, setCity] = useState<string>("");

  // JobType string state (safe)
  const jobTypeString = watch("jobType") ?? "";
  const jobTypeValue = typeof jobTypeString === "string" && jobTypeString.length > 0
    ? jobTypeString.split(",")
    : [];

  const handleJobTypeChange = (option: string) => {
    let next: string[];
    if (jobTypeValue.includes(option)) {
      next = jobTypeValue.filter((v: string) => v !== option);
    } else {
      next = [...jobTypeValue, option];
    }
    setValue("jobType", next.join(","), { shouldValidate: true });
  };

  // Industry handlers
  const handleIndustryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setIndustryInput(keyword);
    setValue("industry", ""); // reset value until selection
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (keyword.length >= 2) {
      timeoutRef.current = setTimeout(() => {
        fetch(`/api/industries/search?keyword=${encodeURIComponent(keyword)}`)
          .then(res => res.json())
          .then(data => {
            setIndustryOptions(data.success ? data.data : []);
            setShowDropdown(true);
          });
      }, 300);
    } else {
      setIndustryOptions([]);
      setShowDropdown(false);
    }
  };
  const handleIndustrySelect = (option: IndustryOptionDTO) => {
    setIndustryInput(option.label);
    setValue("industry", option.value, { shouldValidate: true });
    setShowDropdown(false);
  };

  // Location handlers
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prov = e.target.value;
    setProvince(prov);
    setCity("");
    setValue("locationCode", "");
    if (prov) {
      fetch(`/api/locations/cities?province=${encodeURIComponent(prov)}`)
        .then(res => res.json())
        .then(data => {
          setCities(data.success ? data.data : []);
        });
    } else {
      setCities([]);
    }
  };
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setCity(code);
    setValue("locationCode", code, { shouldValidate: true });
  };

  return (
    <FormCard title="기본 정보">
      <FormField label="공고 제목" name="title" required error={errors.title?.message as string}>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="공고 제목을 입력해주세요"
          {...register("title")}
        />
      </FormField>

      <FormField label="산업 분야" name="industry" required error={errors.industry?.message as string}>
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="산업 분야를 입력하세요 (예: IT, 제조업 등)"
            value={industryInput}
            onChange={handleIndustryInput}
            autoComplete="off"
            onFocus={() => {
              if (industryOptions.length > 0) setShowDropdown(true);
            }}
          />
          {showDropdown && industryOptions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded shadow max-h-60 overflow-auto">
              {industryOptions.map(opt => (
                <li
                  key={opt.value}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onMouseDown={() => handleIndustrySelect(opt)}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </FormField>

      <FormField label="직무 카테고리" name="jobCategoryIds" required error={errors.jobCategoryIds?.message as string}>
        <MultiJobAutoComplete
          value={getValues("jobCategoryIds") || []}
          onChange={opts => setValue("jobCategoryIds", opts, { shouldValidate: true })}
        />
      </FormField>

      <FormField label="근무 지역" name="locationCode" required error={errors.locationCode?.message as string}>
        <div className="flex gap-2">
          <select
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={province}
            onChange={handleProvinceChange}
          >
            <option value="">시/도 선택</option>
            {PROVINCES.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={city}
            onChange={handleCityChange}
            disabled={!province || cities.length === 0}
          >
            <option value="">시/군/구 선택</option>
            {cities.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </FormField>

      <FormField label="고용 형태" name="jobType" required error={errors.jobType?.message as string}>
        <div className="flex flex-wrap gap-2">
          {JOB_TYPE_OPTIONS.map(option => (
            <label key={option} className="flex items-center gap-1 px-2 py-1 border rounded cursor-pointer">
              <input
                type="checkbox"
                checked={jobTypeValue.includes(option)}
                onChange={() => handleJobTypeChange(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="급여" name="salaryCode" required error={errors.salaryCode?.message as string}>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("salaryCode")}
        >
          <option value="">급여 구간 선택</option>
          {SALARY_CODE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </FormField>
    </FormCard>
  );
}
