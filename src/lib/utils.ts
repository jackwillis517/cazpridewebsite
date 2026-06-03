import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { config } from "@/lib/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th"
  switch (day % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

export function parseScholarshipDeadline(dateStr: string): Date {
  const [month, day, year] = dateStr.split("/").map(Number)
  return new Date(year, month - 1, day)
}

export function formatScholarshipDeadline(dateStr: string): string {
  const date = parseScholarshipDeadline(dateStr)
  const month = date.toLocaleDateString("en-US", { month: "long" })
  const day = date.getDate()
  const year = date.getFullYear()
  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`
}

export function isScholarshipActive(): boolean {
  if (!config.scholarship.enabled) return false

  const [month, day, year] = config.scholarship.scholarship_deadline
    .split("/")
    .map(Number)
  const endOfDeadline = new Date(year, month - 1, day, 23, 59, 59, 999)
  return new Date() <= endOfDeadline
}
