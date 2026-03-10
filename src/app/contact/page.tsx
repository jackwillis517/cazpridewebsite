"use client";

import { useState } from "react";
import { Mail, MapPin, Rss, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "rate_limited"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.status === 429) {
        setStatus("rate_limited");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

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
                <Rss className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Follow Us
              </h3>
              <p className="text-sm text-muted-foreground">
                Find us on Facebook or Instagram.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        className="py-16 bg-cover bg-center bg-no-repeat relative bg-none md:bg-[url('/images/hgrey.jpg')]"
        style={{
          backgroundPositionY: "-40px",
        }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Send Us a Message
            </h2>
            <div className="card-pride bg-background p-8">
              {status === "sent" ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-pride-soft mb-6">
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We&apos;ll get back to you as
                    soon as possible.
                  </p>
                  <Button variant="outline" onClick={() => setStatus("idle")}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full name"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="email@example.com"
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      placeholder="How can we help?"
                      required
                      className="min-h-[150px]"
                    />
                  </div>

                  {status === "error" && (
                    <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-sm">
                      Something went wrong. Please try again or email us
                      directly.
                    </div>
                  )}

                  {status === "rate_limited" && (
                    <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-sm">
                      You have submitted too many messages today. Please try
                      again tomorrow or email us directly.
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="rainbow"
                    size="lg"
                    className="w-full"
                    disabled={status === "sending"}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              Find Us
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              53 Albany Street, Cazenovia, NY
            </p>
            <div className="rounded-xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2945.1!2d-75.8527!3d42.9301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d9836e1c8b1a1d%3A0x0!2s53+Albany+St%2C+Cazenovia%2C+NY+13035!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cazenovia Pride Location"
              />
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
