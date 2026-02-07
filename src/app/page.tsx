import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Heart,
  Users,
  Sparkles,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import cazpride from "@/assets/cazpride.png";

const upcomingEvents = [
  {
    id: 1,
    title: "Pride in the Park",
    date: "June 15, 2025",
    time: "12:00 PM - 6:00 PM",
    location: "Lakeland Park, Cazenovia",
    description:
      "Annual celebration with live music, food vendors, and family activities.",
  },
  {
    id: 2,
    title: "Youth Art Workshop",
    date: "April 20, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Community Center",
    description: "Creative expression workshop for LGBTQIA+ youth and allies.",
  },
  {
    id: 3,
    title: "Community Potluck",
    date: "March 8, 2025",
    time: "5:30 PM - 8:00 PM",
    location: "First Presbyterian Church",
    description:
      "Monthly gathering to share food, stories, and community connection.",
  },
];

const impactStats = [
  { number: "500+", label: "Community Members", icon: Users },
  { number: "25+", label: "Events Hosted", icon: Sparkles },
  { number: "12", label: "Partner Organizations", icon: Heart },
];

const galleryPlaceholders = [
  { color: "bg-pink-200", alt: "Volunteers setting up for community event" },
  { color: "bg-purple-200", alt: "Pride parade in downtown Cazenovia" },
  { color: "bg-blue-200", alt: "Community potluck dinner" },
  { color: "bg-yellow-200", alt: "Youth art workshop" },
  { color: "bg-green-200", alt: "Fundraiser event" },
  { color: "bg-red-200", alt: "Candlelight vigil" },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Placeholder */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-300 via-pink-200 to-blue-300" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="mb-8 animate-fade-in">
              <Image
                src={cazpride}
                alt="Caz Pride Logo"
                width={200}
                height={200}
                className="mx-auto rounded-full animate-float"
              />
            </div>

            {/* Headline */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Welcome to <span className="text-rainbow">Cazenovia Pride</span>
            </h1>

            {/* Mission Statement */}
            <p
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-up leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              The purpose of Cazenovia Pride is to celebrate, support, and
              advance the well-being, visibility, and inclusion of LGBTQIA+
              community in Cazenovia and beyond through education, events,
              resource-sharing, and advocacy.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button asChild variant="rainbow" size="lg">
                <Link href="/donate" className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Support Our Mission
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/events" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Donation CTA */}
      <section className="py-16 bg-pride-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full shadow-sm mb-6">
              <Heart className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Become a Monthly Supporter
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Help Caz Pride Show Up — Every Month
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Monthly donations help us plan responsibly, respond when needs
              arise, and keep showing up with consistency and care. Even a small
              monthly gift creates stability.
            </p>
            <Button asChild variant="rainbow" size="lg">
              <Link href="/donate" className="flex items-center gap-2">
                Donate Monthly
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="card-pride p-8 text-center hover:shadow-lg transition-shadow"
              >
                <stat.icon className="h-10 w-10 mx-auto mb-4 text-accent" />
                <div className="text-4xl font-bold text-rainbow mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
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
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="card-pride bg-background p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 text-accent text-sm font-medium mb-3">
                  <Calendar className="h-4 w-4" />
                  {event.date} • {event.time}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </div>
                <p className="text-muted-foreground text-sm">
                  {event.description}
                </p>
              </div>
            ))}
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
            <Button asChild variant="outline">
              <Link href="/gallery" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                View Full Gallery
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryPlaceholders.map((image, index) => (
              <Link
                key={index}
                href="/gallery"
                className="aspect-[4/3] overflow-hidden rounded-xl group relative"
              >
                <div
                  className={`w-full h-full ${image.color} transition-transform duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
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
            Whether you're looking for community, resources, or ways to get
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
    </>
  );
}
