import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMonthIndex = (month: string) => {
  return months.indexOf(month);
};

export function parseDate(date: string) {
  const elements = date.split(" ");
  const [month, day, year] = elements;
  return new Date(Number(year), getMonthIndex(month), Number(day.slice(0, -1)));
}
