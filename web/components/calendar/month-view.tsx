'use client'

import { getMonthCalendar, getShortDayName } from '@/lib/calendar-utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MonthViewProps {
  date: Date
  onDateChange: (date: Date) => void
  onDayClick: (date: Date) => void
}

export function MonthView({ date, onDateChange, onDayClick }: MonthViewProps) {
  const monthCalendar = getMonthCalendar(date.getFullYear(), date.getMonth())

  const handlePrevMonth = () => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() - 1)
    onDateChange(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() + 1)
    onDateChange(newDate)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevMonth}
          className="hover:bg-secondary"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-tight">{monthCalendar.monthName}</h1>
          <p className="text-sm text-muted-foreground">{date.getFullYear()}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextMonth}
          className="hover:bg-secondary"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 bg-secondary border-b border-border">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="p-4 text-center font-semibold text-sm text-foreground uppercase tracking-wide"
            >
              {getShortDayName(i)}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7">
          {monthCalendar.weeks.map((week) =>
            week.days.map((day, index) => (
              <button
                key={day.date.toISOString()}
                onClick={() => onDayClick(day.date)}
                className={`
                  min-h-24 p-4 border-b border-r border-border text-left transition-all duration-200
                  hover:bg-secondary
                  ${index === 6 ? 'border-r-0' : ''}
                  ${
                    monthCalendar.weeks.indexOf(week) === monthCalendar.weeks.length - 1
                      ? 'border-b-0'
                      : ''
                  }
                  ${day.isCurrentMonth ? 'bg-card' : 'bg-muted/30'}
                `}
              >
                <div className="flex flex-col items-start gap-2 h-full">
                  <span
                    className={`
                      text-sm font-semibold w-8 h-8 rounded-lg flex items-center justify-center
                      ${day.isToday ? 'bg-accent text-accent-foreground' : ''}
                      ${day.isCurrentMonth && !day.isToday ? 'text-foreground' : ''}
                      ${!day.isCurrentMonth ? 'text-muted-foreground opacity-40' : ''}
                    `}
                  >
                    {day.date.getDate()}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
