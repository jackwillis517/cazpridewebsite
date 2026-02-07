import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-pride-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get in <span className="text-rainbow">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions, want to volunteer, or just want to say hello?
              We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-pride bg-background p-6 text-center">
              <div className="h-14 w-14 rounded-full bg-pride-soft flex items-center justify-center mx-auto mb-4">
                <Mail className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
              <a
                href="mailto:cazenoviapride@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                cazenoviapride@gmail.com
              </a>
            </div>

            <div className="card-pride bg-background p-6 text-center">
              <div className="h-14 w-14 rounded-full bg-pride-soft flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Address
              </h3>
              <p className="text-sm text-muted-foreground">
                53 Albany Street
                <br />
                Cazenovia, NY
              </p>
            </div>

            <div className="card-pride bg-background p-6 text-center">
              <div className="h-14 w-14 rounded-full bg-pride-soft flex items-center justify-center mx-auto mb-4">
                <Phone className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Follow Us
              </h3>
              <p className="text-sm text-muted-foreground">
                Find us on Facebook, Instagram, and Twitter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-rainbow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Want to Support Our Mission?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Your generosity helps us continue building an inclusive community.
          </p>
          <Button asChild variant="secondary" size="lg">
            <a href="/donate">Donate Now</a>
          </Button>
        </div>
      </section>
    </>
  );
}
