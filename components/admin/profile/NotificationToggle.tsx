import { Switch } from "@/components/ui/switch"

interface NotificationToggleProps {
  id: string
  title: string
  description: string
  defaultChecked: boolean
}

export default function NotificationToggle({ id, title, description, defaultChecked }: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Switch id={id} defaultChecked={defaultChecked} />
    </div>
  )
}
