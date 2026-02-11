"use client";

import { Calendar, MapPin } from "lucide-react";
import { EventProps } from "./page";

export function PastEvents({ events, loading, error }: EventProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading past events...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h3 className="text-lg font-semibold text-muted-foreground mb-4">
        Past Events Archive
      </h3>
      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event.id}
            className="p-6 bg-secondary rounded-xl opacity-75"
          >
            <h3 className="text-lg font-bold text-foreground mb-2">
              {event.title}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">No past events to display.</p>
      )}
    </div>
  );
}
