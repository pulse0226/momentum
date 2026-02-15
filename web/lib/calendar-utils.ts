/**
 * Calendar utility functions for date calculations and formatting
 */

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  dayOfWeek: number
}

export interface CalendarWeek {
  days: CalendarDay[]
  weekNumber: number
  startDate: Date
  endDate: Date
}

export interface CalendarMonth {
  weeks: CalendarWeek[]
  month: number
  year: number
  monthName: string
}

export interface CalendarYear {
  months: CalendarMonth[]
  year: number
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * Get the first day of the week for a given date
 */
export function getStartOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - day)
  return d
}

/**
 * Get the last day of the week for a given date
 */
export function getEndOfWeek(date: Date): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + (6 - d.getDay()))
  return d
}

/**
 * Get the first day of the month
 */
export function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * Get the last day of the month
 */
export function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

/**
 * Get the day name for a given day of week (0-6)
 */
export function getDayName(dayOfWeek: number): string {
  return DAYS_OF_WEEK[dayOfWeek]
}

/**
 * Get short day name (e.g., "Sun", "Mon")
 */
export function getShortDayName(dayOfWeek: number): string {
  return DAYS_OF_WEEK[dayOfWeek].slice(0, 3)
}

/**
 * Get the month name
 */
export function getMonthName(month: number): string {
  return MONTH_NAMES[month]
}

/**
 * Get week number in year
 */
export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

/**
 * Format date as YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Format date as "Mon, Jan 15"
 */
export function formatShortDate(date: Date): string {
  const dayName = getShortDayName(date.getDay())
  const monthName = getMonthName(date.getMonth()).slice(0, 3)
  const day = date.getDate()
  return `${dayName}, ${monthName} ${day}`
}

/**
 * Generate calendar data for a specific month
 */
export function getMonthCalendar(year: number, month: number): CalendarMonth {
  const startDate = getStartOfMonth(new Date(year, month, 1))
  const endDate = getEndOfMonth(new Date(year, month, 1))

  const weeks: CalendarWeek[] = []
  let currentDate = getStartOfWeek(startDate)
  const today = new Date()

  while (currentDate <= endDate) {
    const weekStart = new Date(currentDate)
    const days: CalendarDay[] = []

    for (let i = 0; i < 7; i++) {
      const isCurrentMonth = currentDate.getMonth() === month
      const dayData: CalendarDay = {
        date: new Date(currentDate),
        isCurrentMonth,
        isToday: isSameDay(currentDate, today),
        dayOfWeek: currentDate.getDay(),
      }
      days.push(dayData)
      currentDate.setDate(currentDate.getDate() + 1)
    }

    weeks.push({
      days,
      weekNumber: getWeekNumber(weekStart),
      startDate: new Date(weekStart),
      endDate: new Date(new Date(currentDate).setDate(currentDate.getDate() - 1)),
    })
  }

  return {
    weeks,
    month,
    year,
    monthName: getMonthName(month),
  }
}

/**
 * Generate calendar data for a specific year (all 12 months)
 */
export function getYearCalendar(year: number): CalendarYear {
  const months: CalendarMonth[] = []

  for (let month = 0; month < 12; month++) {
    months.push(getMonthCalendar(year, month))
  }

  return {
    months,
    year,
  }
}

/**
 * Generate calendar data for a specific week
 */
export function getWeekCalendar(date: Date): CalendarWeek {
  const weekStart = getStartOfWeek(date)
  const days: CalendarDay[] = []
  const today = new Date()

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(weekStart)
    currentDate.setDate(currentDate.getDate() + i)

    const dayData: CalendarDay = {
      date: currentDate,
      isCurrentMonth: true,
      isToday: isSameDay(currentDate, today),
      dayOfWeek: currentDate.getDay(),
    }
    days.push(dayData)
  }

  return {
    days,
    weekNumber: getWeekNumber(weekStart),
    startDate: new Date(weekStart),
    endDate: new Date(new Date(weekStart).setDate(weekStart.getDate() + 6)),
  }
}

/**
 * Get all hours of the day for the day view
 */
export function getHoursOfDay(): number[] {
  return Array.from({ length: 24 }, (_, i) => i)
}

/**
 * Format hour as 12-hour format
 */
export function formatHour(hour: number): string {
  if (hour === 0) return '12:00 AM'
  if (hour < 12) return `${hour}:00 AM`
  if (hour === 12) return '12:00 PM'
  return `${hour - 12}:00 PM`
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Add months to a date
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

/**
 * Add years to a date
 */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date)
  result.setFullYear(result.getFullYear() + years)
  return result
}
