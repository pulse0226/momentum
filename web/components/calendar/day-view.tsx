"use client";

import {
  getHoursOfDay,
  formatHour,
  formatShortDate,
} from "@/lib/calendar-utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addDays } from "@/lib/calendar-utils";

interface DayViewProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export function DayView({ date, onDateChange }: DayViewProps) {
  const hours = getHoursOfDay();
  const isToday = new Date().toDateString() === date.toDateString();

  const handlePrevDay = () => {
    onDateChange(addDays(date, -1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(date, 1));
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePrevDay}
          className="hover:bg-secondary"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-tight">
            {date.toLocaleDateString("en-US", { weekday: "long" })}
          </h1>
          <p className="text-sm text-muted-foreground">
            {formatShortDate(date)}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNextDay}
          className="hover:bg-secondary"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {!isToday && (
        <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg flex items-center justify-between">
          <span className="text-sm font-medium text-accent">Today</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToday}
            className="text-accent hover:bg-accent/20"
          >
            Go to today
          </Button>
        </div>
      )}

      <div className="border border-border rounded-lg bg-card overflow-hidden">
        {/* Day header */}
        <div className="bg-secondary border-b border-border p-6">
          <div className="flex items-center gap-3">
            <div
              className={`
                w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-lg
                ${isToday ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"}
              `}
            >
              {date.getDate()}
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Hour blocks */}
        <div className="max-h-[70vh] overflow-y-auto">
          {hours.map((hour, index) => (
            <div
              key={hour}
              className={`flex border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors duration-200`}
            >
              <div className="w-20 flex-shrink-0 border-r border-border bg-muted/20 p-4 text-right">
                <span className="text-xs font-medium text-muted-foreground">
                  {formatHour(hour)}
                </span>
              </div>
              <div className="flex-1 p-4 min-h-20 flex items-start">
                <div className="w-full h-full border-l-4 border-transparent hover:border-accent rounded-sm transition-colors duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
