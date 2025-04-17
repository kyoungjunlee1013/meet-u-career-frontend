interface BadgeProps {
  text: string
}

export function Badge({ text }: BadgeProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
      {text}
    </span>
  )
}
