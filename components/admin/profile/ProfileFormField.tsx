import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProfileFormFieldProps {
  label: string
  id: string
  defaultValue: string
  isEditing: boolean
  type?: string
}

export default function ProfileFormField({ label, id, defaultValue, isEditing, type = "text" }: ProfileFormFieldProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        defaultValue={defaultValue}
        readOnly={!isEditing}
        className={!isEditing ? "bg-gray-50" : ""}
      />
    </div>
  )
}
