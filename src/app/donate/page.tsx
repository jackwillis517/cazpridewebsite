"use client";

import { useState } from "react";
import { Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const donationAmounts = [10, 25, 50, 100];

export default function Donate() {
  const [donationType, setDonationType] = useState<"monthly" | "one-time">(
    "monthly",
  );
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");

  const currentAmount = customAmount
    ? parseFloat(customAmount)
    : selectedAmount;

  return (
    <>
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
              Monthly donations help us plan responsibly, respond when needs
              arise, and keep showing up with consistency and care. Even a small
              monthly gift creates stability that allows us to grow programs,
              support volunteers, and serve our community.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="card-pride bg-background p-8">
              {/* Donation Type Toggle */}
              <div className="flex gap-2 mb-8">
                <Button
                  variant={donationType === "monthly" ? "rainbow" : "outline"}
                  className="flex-1"
                  onClick={() => setDonationType("monthly")}
                >
                  Monthly
                </Button>
                <Button
                  variant={donationType === "one-time" ? "rainbow" : "outline"}
                  className="flex-1"
                  onClick={() => setDonationType("one-time")}
                >
                  One-Time
                </Button>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select Amount
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                        selectedAmount === amount && !customAmount
                          ? "bg-rainbow text-primary-foreground shadow-pride"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="pl-8 h-14 text-lg"
                  />
                </div>
              </div>

              {/* Summary */}
              {currentAmount && currentAmount > 0 && (
                <div className="bg-pride-soft rounded-lg p-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">
                      Your {donationType} donation
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      ${currentAmount.toFixed(2)}
                      {donationType === "monthly" && (
                        <span className="text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              )}

              {/* Donate Button */}
              <Button variant="rainbow" size="lg" className="w-full mb-6">
                <Heart className="h-5 w-5 mr-2" />
                {donationType === "monthly"
                  ? "Start Monthly Donation"
                  : "Donate Now"}
              </Button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Secure payment processing</span>
              </div>
            </div>

            {/* Monthly Benefits */}
            {donationType === "monthly" && (
              <div className="mt-8 p-6 bg-secondary rounded-xl">
                <p className="text-sm text-muted-foreground text-center">
                  Monthly donations can be changed or canceled at any time.
                  You&apos;ll receive a receipt for each donation for tax purposes.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-secondary">
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
      </section>

      {/* Emotional Appeal */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-pride-soft mb-6">
              <Heart className="h-8 w-8 text-accent" />
            </div>
            <p className="text-lg text-muted-foreground mb-4 italic">
              &quot;If Caz Pride has helped you feel seen, supported, or hopeful, a
              monthly gift is a powerful way to help pass that forward.&quot;
            </p>
            <p className="text-foreground font-medium">
              There&apos;s no &quot;right&quot; amount. Just a shared commitment to showing up
              — together.
            </p>
          </div>
        </div>
      </section>

      {/* Other Ways */}
      <section className="py-16 bg-rainbow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-primary-foreground mb-4">
            Other Ways to Help
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">
            Can&apos;t donate right now? There are other ways to support our mission.
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
      </section>
    </>
  );
}
