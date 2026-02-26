"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import cazprideLogo from "@/assets/cazpride.png";
import { Event, formatGoogleEvent, EventCache } from "@/lib/event-utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Resources", path: "/resources" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const CALENDAR_API_KEY =
      process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || "";
    const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "";

    // const cacheKey = "banner_next_event";
    // const cachedData = EventCache.get(cacheKey);

    // if (cachedData && cachedData.length > 0) {
    //   setNextEvent(cachedData[0]);
    //   return;
    // }

    const controller = new AbortController();

    const fetchNextEvent = async () => {
      try {
        const now = new Date();
        const timeMin = now.toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime&maxResults=1`,
          { signal: controller.signal },
        );

        if (!response.ok) return;

        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const formatted = formatGoogleEvent(data.items[0]);
          setNextEvent(formatted);
          // EventCache.set(cacheKey, [formatted]);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error(err);
      }
    };

    fetchNextEvent();
    return () => controller.abort();
  }, []);

  const formatBannerDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Event Banner */}
      {nextEvent && !bannerDismissed && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-accent text-accent-foreground">
          <Link href="/events" className="container mx-auto px-4 py-3 flex items-center justify-center gap-2 text-center pr-10 sm:pr-12 block hover:bg-accent/80 transition-colors">
            <p className="text-sm md:text-lg font-medium">
              Save the Date!{" "}
              <span className="font-bold">{nextEvent.title}</span> is coming{" "}
              <span className="font-bold">
                {formatBannerDate(nextEvent.date)}
              </span>
              !
            </p>
            <MousePointerClick className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
          </Link>
          <button
            onClick={() => setBannerDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 z-50 bg-background transition-all duration-300 ${
          nextEvent && !bannerDismissed ? "top-[80px] sm:top-[48px]" : "top-0"
        }`}
      >
        <div className="container h-20 mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src={cazprideLogo}
                alt="Caz Pride Logo"
                width={64}
                height={64}
                className="rounded-full transition-transform group-hover:scale-105"
              />
              <span className="font-bold text-xl text-foreground hidden sm:block">
                Cazenovia Pride
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.path
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button asChild variant="rainbow" size="lg">
                <Link href="/donate" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Donate
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 w-screen bg-background border-t border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      pathname === link.path
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border mt-2">
                  <Button
                    asChild
                    variant="rainbow"
                    size="lg"
                    className="w-full"
                  >
                    <Link
                      href="/donate"
                      className="flex items-center justify-center gap-2"
                    >
                      <Heart className="h-4 w-4" />
                      Donate
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rainbow bar at top */}
        <div className="absolute bottom-0 left-0 right-0 h-1 rainbow-bar-animated opacity-80" />
      </header>
    </>
  );
}

export default Header;
