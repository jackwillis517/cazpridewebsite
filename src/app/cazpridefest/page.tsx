"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScholarshipModal } from "@/components/ui/ScholarshipModal";
import { config } from "@/lib/config";
import { formatScholarshipDeadline, isScholarshipActive } from "@/lib/utils";

const cards = [
  {
    title: "Vendor Application",
    description:
      "Interested in setting up a booth at Pride Fest? Apply to be a vendor and share your products, services, or organization with our community.",
    image: `${config.prideFest.imgs.vendor}`,
    linkText: "Apply as a Vendor",
    href: `${config.prideFest.formURLs.vendorFormURL}` || "#",
  },
  {
    title: "Volunteer Sign-Up",
    description:
      "Help make Pride Fest a success! Volunteers are the heart of our event, whether it's setup, being a parage wrangler, or lending a hand where needed.",
    image: `${config.prideFest.imgs.volunteer}`,
    linkText: "Sign Up to Volunteer",
    href: `${config.prideFest.formURLs.volunteerFormURL}` || "#",
  },
  {
    title: "Parade Sign-Up",
    description:
      "March with us! Sign up to join the Pride Fest parade and celebrate our community in full color.",
    image: `${config.prideFest.imgs.parade}`,
    linkText: "Sign Up for the Parade",
    href: `${config.prideFest.formURLs.paradeSignUpFormURL}` || "#",
  },
  {
    title: "2026 Scholarship",
    image: `${config.scholarship.img}`,
    linkText: "Apply Now",
    href: `${config.scholarship.formURL}` || "#",
  },
];

export default function CazPrideFest() {
  const showScholarship = isScholarshipActive();
  const scholarshipDescription = `A $500 scholarship open to graduating Cazenovia High School and Madison County seniors who identify as LGBTQIA+ and/or are supportive allies. Deadline: ${formatScholarshipDeadline(config.scholarship.scholarship_deadline)}.`;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-background overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <Image
              src={config.prideFest.imgs.hero}
              alt="Caz Pride Fest 2026 - Together in Full Color"
              width={900}
              height={600}
              className="w-full h-auto rounded-2xl shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 bg-pride-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Caz Pride Fest <span className="text-rainbow">&apos;26</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Join us for a day of celebration, community, and togetherness at
              Lorenzo Historic State Site. Together in Full Color!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-foreground font-medium">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Saturday, June 27th, 2026
              </span>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                Lorenzo Historic State Site
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Get Involved
          </h2>
          <div className={`grid grid-cols-1 ${showScholarship ? "md:grid-cols-2 lg:grid-cols-4 max-w-6xl" : "md:grid-cols-3 max-w-5xl"} gap-8 mx-auto`}>
            {cards.map((card) => {
              if (card.title === "2026 Scholarship") {
                if (!showScholarship) return null;
                return (
                  <ScholarshipModal
                    key={card.title}
                    trigger={(open) => (
                      <button
                        onClick={open}
                        className="group card-pride bg-background overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 text-left"
                      >
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {card.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {scholarshipDescription}
                          </p>
                          <span className="inline-flex items-center gap-1 text-accent font-medium text-sm group-hover:gap-2 transition-all">
                            Learn More
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </button>
                    )}
                  />
                );
              }
              return (
                <a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card-pride bg-background overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {card.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-accent font-medium text-sm group-hover:gap-2 transition-all">
                      {card.linkText}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-rainbow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Save the Date!
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Saturday, June 27th, 2026 at Lorenzo Historic State Site. We
            can&apos;t wait to celebrate with you!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/donate">Support Pride Fest</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
