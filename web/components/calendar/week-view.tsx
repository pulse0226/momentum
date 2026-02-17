"use client";

import {
  getWeekCalendar,
  getHoursOfDay,
  formatHour,
  formatShortDate,
} from "@/lib/calendar-utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeekViewProps {
  date: Date;
  onDateChange: (date: Date) => void;
  onDayClick: (date: Date) => void;
}

export function WeekView({ date, onDateChange, onDayClick }: WeekViewProps) {
  const weekCalendar = getWeekCalendar(date);
  const hours = getHoursOfDay();

  const handlePrevWeek = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 7);
    onDateChange(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    onDateChange(newDate);
  };

  const formatWeekRange = () => {
    const start = weekCalendar.startDate;
    const end = weekCalendar.endDate;
    const startMonth = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endMonth = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return `${startMonth} - ${endMonth}, ${start.getFullYear()}`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevWeek}
          className="hover:bg-secondary"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-tight">
            Week {weekCalendar.weekNumber}
          </h1>
          <p className="text-sm text-muted-foreground">{formatWeekRange()}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextWeek}
          className="hover:bg-secondary"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full border border-border rounded-lg bg-card">
          {/* Day headers */}
          <div className="flex">
            <div className="w-16 flex-shrink-0 border-r border-border bg-secondary p-4">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Time
              </div>
            </div>
            <div className="flex flex-1">
              {weekCalendar.days.map((day) => (
                <button
                  key={day.date.toISOString()}
                  onClick={() => onDayClick(day.date)}
                  className={`
                    flex-1 min-w-[160px] p-4 border-r border-b border-border text-center
                    transition-all duration-200 hover:bg-secondary
                    ${day.isToday ? "bg-accent/10 border-accent" : ""}
                  `}
                >
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    {day.date.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div
                    className={`
                      text-2xl font-light
                      ${day.isToday ? "text-accent font-semibold" : "text-foreground"}
                    `}
                  >
                    {day.date.getDate()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Hour rows */}
          {hours.map((hour) => (
            <div
              key={hour}
              className="flex border-b border-border last:border-b-0"
            >
              <div className="w-16 flex-shrink-0 border-r border-border bg-secondary/30 p-3 text-right">
                <span className="text-xs font-medium text-muted-foreground">
                  {formatHour(hour)}
                </span>
              </div>
              <div className="flex flex-1">
                {weekCalendar.days.map((day) => (
                  <button
                    key={`${day.date.toISOString()}-${hour}`}
                    onClick={() => onDayClick(day.date)}
                    className={`
                      flex-1 min-w-[160px] h-16 border-r border-border p-2
                      hover:bg-secondary transition-all duration-200
                      ${day.isToday ? "bg-accent/5" : ""}
                    `}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
