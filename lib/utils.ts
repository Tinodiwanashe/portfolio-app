import { clsx, type ClassValue } from "clsx"
import he from 'he';
import { useFormatter, useNow } from "next-intl";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getInitials = (name: string) => {
  return name
    .trim()
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

export const formatDateToLocal = (
  date: string | number
) => {
  const format = useFormatter();
  const dateObj = new Date(date);

  return format.dateTime(dateObj, {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export function dateTimePrettyFormat(date: string | number) {
  // Use the global now value initially …
  const now = useNow({
    // … and update it every 60 seconds
    updateInterval: 1000 * 60
  });  

  // Use the formatted date value to render the relative time.
  const format = useFormatter();
  const dateObj = new Date(date);
  
  // Renders "2 hours ago" and updates continuously
  return format.relativeTime(dateObj, now);
}

export function dateRangePrettyFormat(startDate: string | number, endDate: string | number) {

  // Use the formatted date value to render the relative time.
  const format = useFormatter();
  const startOnObj = new Date(startDate);
  const endOnObj = new Date(endDate);
  
  // Renders "Nov 20, 2020 – Jan 24, 2021"
  return format.dateTimeRange(startOnObj, endOnObj, 'short');
}

export const formatCurrency = (amount: number, currency = 'ZAR') => {
  const format = useFormatter();

  // Renders "R499.90"
  return format.number(amount, {
    style: 'currency', 
    currency
  });
};

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
    window.location.hash = `#${id}`;
  }
};

export const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export function textEllipsis(text: string, numberOfChars: number): string {
  return text.length > numberOfChars? `${text.slice(0, numberOfChars)}...` : text;
}

export const extractHTML = (htmlString: string, tagName: string) => {
  const decodedHTML = decodeHtml(htmlString);
  const parser = new DOMParser();
  const doc = parser.parseFromString(decodedHTML, 'text/html');
  const element = doc.querySelector(tagName);
  return element ?? null;
};

export function decodeHtml(htmlString: string) { 
  return he.decode(htmlString);
}