"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarProps } from "./page";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function CalendarView({events, loading, error, currentDate, onMonthChange}: CalendarProps) {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const previousMonth = () => {
    onMonthChange(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    onMonthChange(new Date(currentYear, currentMonth + 1, 1));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading calendar events...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={previousMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold text-foreground">
          {months[currentMonth]} {currentYear}
        </h2>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-8">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square bg-muted/20 rounded-lg" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayEvents = events.filter(
            (e) => e.date.getDate() === day
          );
          
          return (
            <div
              key={day}
              className={`aspect-square flex flex-col p-1 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors overflow-hidden min-h-[80px]`}
            >
              <div className="text-right text-xs font-medium text-muted-foreground mb-1">
                {day}
              </div>
              <div className="flex flex-col gap-1 overflow-y-auto max-h-full no-scrollbar">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-blue-600 text-[10px] text-white px-1.5 py-0.5 rounded truncate font-medium shadow-sm"
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Events this month List (optional, kept for accessibility/details) */}
      {events.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-foreground">Events this month:</h3>
          {events.map((event) => (
            <div key={event.id} className="p-4 bg-secondary rounded-lg">
              <div className="font-medium text-foreground">{event.title}</div>
              <div className="text-sm text-muted-foreground">
                {formatDate(event.date)} • {event.time}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
