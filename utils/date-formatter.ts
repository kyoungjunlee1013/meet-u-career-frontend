export function formatDate(dateString: string): string {
  // If the date is already in YYYY-MM-DD format, return it
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString
  }

  try {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0] // Returns YYYY-MM-DD
  } catch (error) {
    console.error("Error formatting date:", error)
    return dateString // Return original string if parsing fails
  }
}
