'use client';

import Calendar from "@/components/calendar/calendar";

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-foreground mb-2">
            Calendar
          </h1>
          <p className="text-lg text-muted-foreground">
            Navigate through your schedule with year, month, week, and day views
          </p>
        </div>
        <Calendar />
      </div>
    </main>
  );
}
