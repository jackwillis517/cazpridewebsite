"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Heart,
  X,
  Clock,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScholarshipModal } from "@/components/ui/ScholarshipModal";
// import { EventCache } from "@/lib/event-utils";
import { Event, formatGoogleEvent } from "@/lib/event-utils";
import { config } from "@/lib/config";

export default function Home() {
  const CALENDAR_API_KEY =
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || "";
  const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "";

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    // const cacheKey = "home_upcoming_events";
    // const cachedData = EventCache.get(cacheKey);

    // if (cachedData) {
    //   setEvents(cachedData);
    //   setLoading(false);
    //   return;
    // }

    const controller = new AbortController();

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const now = new Date();
        const timeMin = now.toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime&maxResults=3`,
          { signal: controller.signal },
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        console.log("[Home] Raw Google Calendar API response:", data);
        const formatted = data.items.map(formatGoogleEvent);
        console.log("[Home] Formatted events:", formatted);
        setEvents(formatted);
        // EventCache.set(cacheKey, formatted);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    return () => controller.abort();
  }, [CALENDAR_API_KEY, CALENDAR_ID]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={config.hero}
            alt="Caz Pride hero"
            width={1920}
            height={1080}
            className="absolute object-cover h-full hero-bg"
            style={{ width: "150%", scale: "1.2" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-8 animate-fade-in">
              <Image
                src="/favicon.png"
                alt="Caz Pride Logo"
                width={200}
                height={200}
                className="mx-auto rounded-full animate-float"
              />
            </div>

            {/* Headline */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Welcome to <span className="text-rainbow">Cazenovia Pride</span>
            </h1>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                asChild
                variant="rainbow"
                size="lg"
                className="px-8 py-6 text-lg"
              >
                <Link
                  href="/cazpridefest"
                  className="tracking-wide font-extrabold"
                >
                  Caz Pride Fest &apos;
                  {new Date().getFullYear().toString().slice(-2)}
                </Link>
              </Button>
              <Button
                asChild
                variant="pride"
                size="lg"
                className="px-8 py-6 text-lg"
              >
                <Link href="/events" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </Link>
              </Button>
            </div>

            {/* Mission Statement */}
            <p
              className="text-xl md:text-xl text-black max-w-3xl mx-auto mb-6 animate-fade-in-up leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              The purpose of Cazenovia Pride is to celebrate, support, and
              advance the well-being, visibility, and inclusion of LGBTQIA+
              community in Cazenovia and beyond through education, events,
              resource-sharing, and advocacy.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-pride-soft">
        <div className="container mx-auto px-4">
          {/* Official communications notice — matches event cards, yellow top accent */}
          <div
            role="note"
            className="card-pride-warning bg-background mb-10 md:mb-12 flex flex-col gap-4 p-4 sm:flex-row sm:gap-5 sm:p-6"
          >
            <div className="flex shrink-0 justify-center sm:justify-start">
              <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-yellow-400/15">
                <AlertTriangle
                  className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-700 dark:text-yellow-500"
                  aria-hidden
                />
              </div>
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3 leading-snug">
                A note about official Cazenovia Pride communications
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                All emails and outreach from Cazenovia Pride, Inc. will come
                exclusively from an{" "}
                <span className="font-medium text-foreground whitespace-nowrap">
                  @cazpride.org
                </span>{" "}
                email address. If you receive any message related to Caz Pride
                Fest vendor opportunities, sponsorships, or other organizational
                business from a different email address, please do not send
                money or personal information — contact us directly at{" "}
                <a
                  href="mailto:info@cazpride.org"
                  className="font-medium text-accent underline underline-offset-2 hover:opacity-90 break-all sm:break-normal"
                >
                  info@cazpride.org
                </a>{" "}
                to verify. We will never ask vendors or community members to
                submit payments through unofficial channels.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground">
                Join us for community gatherings, celebrations, and support.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/events" className="flex items-center gap-2">
                View All Events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                Loading upcoming events...
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <Calendar className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">
                  We couldn&apos;t load events right now. Please check back
                  later or visit our{" "}
                  <Link href="/events" className="text-accent hover:underline">
                    events page
                  </Link>
                  .
                </p>
              </div>
            ) : events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="card-pride bg-background p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-accent text-sm font-medium mb-3">
                    <Calendar className="h-4 w-4" />
                    {event.date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    • {event.time}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                  {event.link ? (
                    <Button
                      asChild
                      variant="rainbow"
                      size="sm"
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Register/Get Tickets
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="text-foreground"
                    >
                      See Description for Tickets
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No upcoming events found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Scholarship */}
      {config.scholarship.enabled === true && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <Image
                  src={config.scholarship.img}
                  alt="2026 Caz Pride Scholarship"
                  width={600}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <a
                  href={config.scholarship.formURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full shadow-sm mb-4 hover:bg-secondary/80 transition-colors"
                >
                  <GraduationCap className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    Now Accepting Applications
                  </span>
                </a>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  2026 Caz Pride Scholarship
                </h2>
                <p className="text-muted-foreground mb-3">
                  A{" "}
                  <span className="font-semibold text-foreground">
                    $500 scholarship
                  </span>{" "}
                  open to graduating Cazenovia High School and Madison County
                  seniors who identify as LGBTQIA+ and/or are supportive allies.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Deadline:{" "}
                  <span className="font-medium text-foreground">
                    June 1st, 2026
                  </span>
                </p>
                <ScholarshipModal
                  trigger={(open) => (
                    <Button
                      variant="rainbow"
                      size="lg"
                      onClick={open}
                      className="inline-flex items-center gap-2"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Monthly Donation CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full shadow-sm mb-6 hover:bg-background/80 transition-colors"
            >
              <Heart className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Become a Monthly Supporter
              </span>
            </Link>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Help Caz Pride Show Up — Every Month
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Monthly donations help us plan responsibly, respond when needs
              arise, and keep showing up with consistency and care. Even a small
              monthly gift creates stability.
            </p>
            <Button asChild variant="rainbow" size="lg">
              <Link href="/donate" className="inline-flex items-center gap-2">
                Donate Monthly
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Our Community
              </h2>
              <p className="text-muted-foreground">
                Moments of joy, pride, and togetherness.
              </p>
            </div>
            {/* <Button asChild variant="outline">
              <Link href="/gallery" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                View Full Gallery
              </Link>
            </Button> */}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {config.gallery.map((image, index) => (
              <div
                key={index}
                className="aspect-[4/3] overflow-hidden rounded-xl relative"
              >
                <Image
                  src={image}
                  alt={`Caz Pride community photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-rainbow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Together, We Are Stronger
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Whether you&apos;re looking for community, resources, or ways to get
            involved, Cazenovia Pride is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/about">Learn About Us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-background rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {selectedEvent.title}
                </h3>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {selectedEvent.date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedEvent.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedEvent.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded-lg hover:bg-secondary transition-colors shrink-0 ml-4"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div
              className="p-6 overflow-y-auto text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none [&_a]:text-accent [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: selectedEvent.rawDescription }}
            />
            <div className="p-6 border-t border-border">
              {selectedEvent.link ? (
                <Button asChild variant="rainbow" className="w-full">
                  <a
                    href={selectedEvent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register/Get Tickets
                  </a>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full text-foreground"
                  disabled
                >
                  See Description for Tickets
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
