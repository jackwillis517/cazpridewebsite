import Script from "next/script";
import { Heart, BookOpen } from "lucide-react";
// import { Button } from "@/components/ui/button";

export default function Donate() {
  return (
    <>
      <Script
        src="https://widgets.givebutter.com/latest.umd.cjs?acct=MiJWqLiDzIXShX3C&p=other"
        strategy="afterInteractive"
      />
      {/* Hero */}
      <section className="py-20 bg-pride-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full shadow-sm mb-6">
              <Heart className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Support Our Mission
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Help Caz Pride <span className="text-rainbow">Show Up</span> —
              Every Month
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Donations help us plan responsibly, respond when needs arise, and
              keep showing up with consistency and care. Even a small monthly
              gift creates stability that allows us to grow programs, support
              volunteers, and serve our community. You can also support us by
              purchasing books from our curated LGBTQ+ bookshelf.
            </p>
          </div>
        </div>

        {/* Givebutter Donation Widget & Bookshop */}
        <div className="container mx-auto px-4 pt-12 pb-16">
          <div className="flex flex-col md:flex-row justify-center gap-0 items-stretch">
            <div className="w-full md:w-[420px] shrink-0">
              {/* @ts-expect-error Givebutter custom element */}
              <givebutter-widget id="gJ926L" align="center"></givebutter-widget>
            </div>
            {/* OR divider */}
            <div className="flex md:flex-col items-center gap-3 py-4 md:py-0 md:px-6">
              <div className="flex-1 w-full md:w-px h-px md:h-full bg-rainbow" />
              <span className="text-sm font-bold text-muted-foreground shrink-0">
                OR
              </span>
              <div className="flex-1 w-full md:w-px h-px md:h-full bg-rainbow" />
            </div>
            <div className="w-full md:w-[420px] shrink-0 bg-gray-50 p-8 rounded-xl border-gray-200 border-2 flex flex-col">
              <div>
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-pride-soft mb-6">
                  <BookOpen className="h-7 w-7 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Shop Our Bookshelf
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Browse our curated collection of LGBTQ+ titles on
                  Bookshop.org. Your purchase supports both Cazenovia Pride and
                  independent bookstores.
                </p>
              </div>
              <a
                href="https://bookshop.org/shop/cazpride"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full mt-8 md:mt-25 h-13 rounded-lg bg-[#E01F80] hover:bg-[#c91b72] text-white font-semibold transition-colors"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Visit Our Bookshop
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      {/*<section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Your Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-background rounded-xl p-6">
                <div className="text-3xl font-bold text-accent mb-2">
                  $10/mo
                </div>
                <p className="text-sm text-muted-foreground">
                  Helps provide snacks for one youth group meeting
                </p>
              </div>
              <div className="bg-background rounded-xl p-6">
                <div className="text-3xl font-bold text-accent mb-2">
                  $25/mo
                </div>
                <p className="text-sm text-muted-foreground">
                  Supports educational materials for ally training
                </p>
              </div>
              <div className="bg-background rounded-xl p-6">
                <div className="text-3xl font-bold text-accent mb-2">
                  $100/mo
                </div>
                <p className="text-sm text-muted-foreground">
                  Funds a community event for 50+ people
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Emotional Appeal */}
      <section className="py-16 bg-rainbow">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-foreground/10 mb-6">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
            <p className="text-lg text-primary-foreground/90 mb-4 italic">
              &quot;If Caz Pride has helped you feel seen, supported, or
              hopeful, a monthly gift is a powerful way to help pass that
              forward.&quot;
            </p>
            <p className="text-primary-foreground font-medium">
              There&apos;s no &quot;right&quot; amount. Just a shared commitment
              to showing up — together.
            </p>
          </div>
        </div>
      </section>

      {/* Other Ways */}
      {/*<section className="py-16 bg-rainbow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-primary-foreground mb-4">
            Other Ways to Help
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">
            Can&apos;t donate right now? There are other ways to support our
            mission.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Volunteer With Us
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
            >
              Spread the Word
            </Button>
          </div>
        </div>
      </section>*/}
    </>
  );
}
