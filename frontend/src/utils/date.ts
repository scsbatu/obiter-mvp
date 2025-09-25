function formatDate(dateString?: string | null): string {
  if (!dateString) return ""; // or return a fallback like "—"

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // invalid date string

  return date.toISOString().split("T")[0];
}

export {
    formatDate
}