import Link from "next/link";
import { Heart, Users, Target, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const boardMembers = [
  {
    name: "Sarah Mitchell",
    role: "Board President",
    bio: "Community advocate with 10+ years of nonprofit leadership experience.",
    color: "bg-pink-200",
  },
  {
    name: "James Chen",
    role: "Vice President",
    bio: "Local business owner and longtime supporter of LGBTQIA+ rights.",
    color: "bg-blue-200",
  },
  {
    name: "Dr. Maria Santos",
    role: "Secretary",
    bio: "Educator and researcher focused on inclusive community development.",
    color: "bg-purple-200",
  },
  {
    name: "Alex Thompson",
    role: "Treasurer",
    bio: "Financial professional dedicated to transparent nonprofit management.",
    color: "bg-green-200",
  },
  {
    name: "Robin Patterson",
    role: "Director of Outreach",
    bio: "Social worker passionate about connecting community members with resources.",
    color: "bg-yellow-200",
  },
  {
    name: "Michael Brooks",
    role: "Director of Events",
    bio: "Event coordinator bringing years of experience in community celebrations.",
    color: "bg-red-200",
  },
];

const values = [
  {
    icon: Heart,
    title: "Inclusion",
    description:
      "We welcome everyone, regardless of identity, background, or experience.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building connections that strengthen and support our neighbors.",
  },
  {
    icon: Target,
    title: "Visibility",
    description:
      "Creating safe spaces where everyone can be seen and celebrated.",
  },
  {
    icon: Shield,
    title: "Advocacy",
    description:
      "Standing up for equality and justice in our community and beyond.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-pride-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full shadow-sm mb-6">
              <Award className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                501(c)(3) Nonprofit
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-rainbow">Cazenovia Pride</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cazenovia Pride, Inc. is a registered 501(c)(3) nonprofit
              organization, governed by a volunteer Board of Directors,
              dedicated to fostering inclusion, visibility, and community
              celebration in Cazenovia and surrounding areas.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Cazenovia Pride began as a grassroots movement, sparked by
                community members who envisioned a more inclusive and welcoming
                environment for LGBTQIA+ individuals and families in the
                Cazenovia area.
              </p>
              <p>
                What started as small gatherings and conversations has grown
                into a vibrant organization that hosts annual Pride
                celebrations, educational workshops, support groups, and
                community events throughout the year.
              </p>
              <p>
                Our mission extends beyond celebration—we work to create lasting
                change through advocacy, education, and building meaningful
                connections between community members, local businesses, and
                organizations.
              </p>
              <p>
                Today, Cazenovia Pride serves hundreds of community members and
                continues to grow, thanks to the dedication of our volunteers,
                board members, and generous supporters who believe in our vision
                of an inclusive community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="card-pride bg-background p-6 text-center"
              >
                <div className="h-14 w-14 rounded-full bg-pride-soft flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Board of Directors
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated volunteers who guide our organization.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member) => (
              <div
                key={member.name}
                className="card-pride bg-background p-6 text-center"
              >
                <div
                  className={`h-24 w-24 rounded-full ${member.color} mx-auto mb-4 shadow-md flex items-center justify-center text-2xl font-bold text-foreground/40`}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-accent mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Please Note:</strong> Cazenovia Pride, Inc. is not
              affiliated with any for-profit business. We are an independent
              nonprofit organization dedicated solely to serving the LGBTQIA+
              community and allies in our region.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-rainbow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Want to Get Involved?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Join us as a volunteer, donor, or community partner. Together we can
            make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/donate">Support Our Mission</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
