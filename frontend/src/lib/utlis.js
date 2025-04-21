export function formatTime(timestamp) {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "Invalid Date";

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // 12-hour format
  minutes = minutes.toString().padStart(2, "0");

  return `${hours}:${minutes} ${period}`;
}
