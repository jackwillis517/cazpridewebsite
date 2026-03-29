import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  ExternalLink,
  FileText,
  Heart,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";

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
            {config.prideGuides.map((guide) => (
              <a
                key={guide.title}
                href={guide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-pride relative overflow-hidden bg-background p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
              >
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover opacity-10 group-hover:opacity-20 transition-opacity"
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
            {config.crisisHotlines.map((hotline) => (
              <div
                key={hotline.name}
                className="card-pride bg-background p-6 border-2 border-destructive/20"
              >
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {hotline.name}
                </h3>
                <a
                  href={`tel:${hotline.phone}`}
                  className="inline-flex items-center gap-2 text-2xl font-bold text-accent mb-1"
                >
                  <Phone className="h-5 w-5" />
                  {hotline.phone}
                </a>
                {hotline.text && (
                  <p className="inline-flex items-center gap-2 text-xl font-bold text-accent mb-1">
                    <MessageCircle className="h-5 w-5" />
                    {hotline.text}
                  </p>
                )}
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

          <p className="text-sm text-muted-foreground mt-6 italic font-bold text-center">
            Please note that we are not able to provide crisis support.
          </p>
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
            {config.supportOrganizations.map((org) => (
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
