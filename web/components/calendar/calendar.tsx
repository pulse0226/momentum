"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { YearView } from "./year-view";
import { MonthView } from "./month-view";
import { DayView } from "./day-view";
import { WeekView } from "./week-view";

type ViewType = "year" | "month" | "week" | "day";

interface CalendarProps {
  initialDateISO?: string;
}

export default function Calendar({ initialDateISO }: CalendarProps) {
  const [curDate, setCurDate] = useState<Date>(() =>
    initialDateISO ? new Date(initialDateISO) : new Date(),
  );
  const [view, setView] = useState<ViewType>("month");

  const handleDateChange = (newDate: Date) => {
    setCurDate(newDate);
  };

  return (
    <div className="w-full">
      {/* View Controls */}
      <div className="flex gap-2 mb-8">
        {(["year", "month", "week", "day"] as ViewType[]).map((viewType) => (
          <Button
            key={viewType}
            className={`capitalize font-semibold transition-all duration-200 ${
              view === viewType
                ? "bg-primary text-primary-foreground"
                : "bg-transparent border text-foreground hover:bg-secondary hover:text-muted-foreground"
            }`}
            onClick={() => setView(viewType)}
            variant={view === viewType ? "default" : "outline"}
          >
            {viewType}
          </Button>
        ))}
      </div>

      <div className="animate-fadeIn">
        {view === "year" && (
          <YearView
            date={curDate}
            onDateChange={handleDateChange}
            onDayClick={() => console.log("day clicked")}
          />
        )}
        {view === "month" && (
          <MonthView
            date={curDate}
            onDateChange={handleDateChange}
            onDayClick={() => console.log("day clicked")}
          />
        )}
        {view === "day" && (
          <DayView
            date={curDate}
            onDateChange={handleDateChange}
          />
        )}
        {view === "week" && (
          <WeekView
            date={curDate}
            onDateChange={handleDateChange}
            onDayClick={() => console.log("day clicked")}
          />
        )}
      </div>
    </div>
  );
}
