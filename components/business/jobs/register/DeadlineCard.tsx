"use client";

import { useFormContext } from "react-hook-form";
import { FormCard } from "./FormCard";
import { FormField } from "./FormField";

const CLOSE_TYPE_OPTIONS = [
  { value: 0, label: "마감일까지" },
  { value: 1, label: "상시 채용" },
];

export function DeadlineCard() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <FormCard title="공고 기간 및 마감">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="접수 시작일" name="openingDate" required error={errors.openingDate?.message as string}>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("openingDate")}
          />
        </FormField>
        <FormField label="마감일" name="expirationDate" required error={errors.expirationDate?.message as string}>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("expirationDate")}
          />
        </FormField>
      </div>
      <FormField label="마감 형식" name="closeType" required error={errors.closeType?.message as string}>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("closeType", { valueAsNumber: true })}
        >
          {CLOSE_TYPE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </FormField>
    </FormCard>
  );
}
