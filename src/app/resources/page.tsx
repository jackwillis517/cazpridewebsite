import Link from "next/link";
import {
  Phone,
  ExternalLink,
  FileText,
  Heart,
  Shield,
  BookOpen,
  Users,
  AlertCircle,
  Sun,
  Snowflake,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const crisisHotlines = [
  {
    name: "988 Suicide & Crisis Lifeline",
    phone: "988",
    description: "24/7 crisis support for LGBTQIA+ individuals and allies.",
    url: "https://988lifeline.org",
  },
  {
    name: "The Trevor Project",
    phone: "1-866-488-7386",
    description: "Crisis intervention and suicide prevention for LGBTQ+ youth.",
    url: "https://www.thetrevorproject.org",
  },
  {
    name: "Trans Lifeline",
    phone: "877-565-8860",
    description: "Peer support hotline run by and for trans people.",
    url: "https://translifeline.org",
  },
];

const supportOrganizations = [
  {
    name: "PFLAG",
    description:
      "Support, education, and advocacy for LGBTQ+ people, their parents, and allies.",
    url: "https://pflag.org",
    icon: Users,
  },
  {
    name: "GLAAD",
    description:
      "Media advocacy organization accelerating acceptance for LGBTQ+ people.",
    url: "https://www.glaad.org",
    icon: BookOpen,
  },
  {
    name: "Human Rights Campaign",
    description:
      "Working for LGBTQ+ equality through advocacy, education, and outreach.",
    url: "https://www.hrc.org",
    icon: Shield,
  },
  {
    name: "Lambda Legal",
    description:
      "Legal advocacy for LGBTQ+ rights and civil rights for people with HIV.",
    url: "https://www.lambdalegal.org",
    icon: Shield,
  },
];

const prideGuides = [
  {
    title: "Winter 2025–2026",
    url: "https://drive.google.com/file/d/1l--CNHeEprtXvsP3U0RyAke9lVeghI7r/preview",
    seasonIcon: Snowflake,
    image: "/prideguides/winter_2025_2026.jpg",
  },
  {
    title: "Summer 2025",
    url: "https://drive.google.com/file/d/1DPRJZ8tIOzb0NetZwTFhV8RarVisIlWp/preview",
    seasonIcon: Sun,
    image: "/prideguides/summer_2025.jpg",
  },
  {
    title: "Summer 2024",
    url: "https://drive.google.com/file/d/1jPgpAJnRKT9AXzlplGcqtSmUwTqOK7n4/preview",
    seasonIcon: Sun,
    image: "/prideguides/summer_2024.jpg",
  },
];

export default function Resources() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-pride-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Community <span className="text-rainbow">Resources</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Support, education, and crisis resources for the LGBTQIA+
              community and allies. You are not alone.
            </p>
          </div>
        </div>
      </section>

      {/* Pride Guides */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Pride Guides
            </h2>
            <p className="text-muted-foreground">
              Our seasonal newsletters keeping the community informed and
              connected.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prideGuides.map((guide) => (
              <a
                key={guide.title}
                href={guide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-pride relative overflow-hidden bg-background p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundImage: `url(${guide.image})` }}
                />
                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-lg bg-pride-soft flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1 flex items-center gap-2">
                    {guide.title}
                    <guide.seasonIcon className="h-5 w-5 text-accent" />
                  </h3>
                  <p className="text-xs text-accent font-medium flex items-center gap-1">
                    View Guide
                    <ExternalLink className="h-3 w-3" />
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Support */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Crisis Support
              </h2>
              <p className="text-muted-foreground">
                You&apos;re not alone. Immediate help when you need it most.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crisisHotlines.map((hotline) => (
              <div
                key={hotline.name}
                className="card-pride bg-background p-6 border-2 border-destructive/20"
              >
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {hotline.name}
                </h3>
                <a
                  href={`tel:${hotline.phone}`}
                  className="inline-flex items-center gap-2 text-2xl font-bold text-accent mb-3"
                >
                  <Phone className="h-5 w-5" />
                  {hotline.phone}
                </a>
                <p className="text-sm text-muted-foreground mb-4">
                  {hotline.description}
                </p>
                <a
                  href={hotline.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Visit Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Organizations */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Support Organizations
            </h2>
            <p className="text-muted-foreground">
              National and local organizations providing ongoing support and
              advocacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportOrganizations.map((org) => (
              <a
                key={org.name}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-pride bg-background p-6 flex items-start gap-4 hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className="h-12 w-12 rounded-lg bg-pride-soft flex items-center justify-center flex-shrink-0">
                  <org.icon className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    {org.name}
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {org.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Local Resources */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need Local Support?
            </h2>
            <p className="text-muted-foreground mb-8">
              Cazenovia Pride maintains connections with local therapists,
              support groups, and community organizations. Contact us for
              personalized referrals and support.
            </p>
            <Button asChild variant="rainbow" size="lg">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
