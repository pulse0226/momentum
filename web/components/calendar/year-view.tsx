"use client";

import {
  getYearCalendar,
  getMonthName,
  getDayName,
  getShortDayName,
} from "@/lib/calendar-utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface YearViewProps {
  date: Date;
  onDateChange: (date: Date) => void;
  onDayClick: (date: Date) => void;
}

export function YearView({ date, onDateChange, onDayClick }: YearViewProps) {
  const year = date.getFullYear();
  const yearCalendar = getYearCalendar(year);

  const handlePrevYear = () => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() - 1);
    onDateChange(newDate);
  };

  const handleNextYear = () => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    onDateChange(newDate);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevYear}
          className="hover:bg-secondary"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-light tracking-tight">{year}</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextYear}
          className="hover:bg-secondary"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {yearCalendar.months.map((month) => (
          <div
            key={month.month}
            className="bg-card rounded-lg border border-border p-4"
          >
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              {month.monthName}
            </h3>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="text-xs font-medium text-muted-foreground text-center h-6"
                >
                  {getShortDayName(i)}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {month.weeks.map((week) =>
                week.days.map((day) => (
                  <button
                    key={day.date.toISOString()}
                    onClick={() => onDayClick(day.date)}
                    className={`
                      text-foreground
                      text-sm
                       w-full aspect-square text-xs rounded flex items-center justify-center font-medium
                      transition-all duration-200 hover:bg-secondary hover:text-foreground
                      ${day.isToday ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}
                      ${!day.isCurrentMonth ? "opacity-50 text-muted-foreground" : "text-foreground"}
                    `}
                  >
                    {day.date.getDate()}
                  </button>
                )),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
