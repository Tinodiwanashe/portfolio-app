import { type ClassValue, clsx } from "clsx"
import he from 'he';
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
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
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


export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();

  if (!date.includes('T')) {
      date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);
  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
      formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
      formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
      formattedDate = `${daysAgo}d ago`;
  } else {
      formattedDate = 'Today';
  }

  const fullDate = targetDate.toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
  });

  if (!includeRelative) {
      return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}

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