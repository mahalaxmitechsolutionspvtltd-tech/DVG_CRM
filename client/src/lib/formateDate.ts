export function formateDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();

  // Add the correct suffix
  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" :
    "th";

  return `${day}${suffix} ${month} ${year}`;
}
