import { format } from "date-fns";

// Function to get the ordinal suffix (st, nd, rd, th)
function getOrdinalSuffix(day: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const tens = day % 100;
  return suffixes[(tens - 20) % 10] || suffixes[tens] || suffixes[0];
}

// Function to format the date
export function formatDate(dateString: string) {
  const date = new Date(dateString || new Date());

  // Get the day and apply the ordinal suffix
  const day = date.getDate();
  const dayWithSuffix = day + getOrdinalSuffix(day);

  // Format the month and year using date-fns
  const month = format(date, "MMM");
  const year = format(date, "yyyy");

  // Return formatted date
  return `${month} ${dayWithSuffix}, ${year}`;
}
