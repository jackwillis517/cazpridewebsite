"use client";

import { useState } from "react";
import {
  X,
  GraduationCap,
  Heart,
  Shield,
  Users,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";

const pillars = [
  {
    icon: Heart,
    title: "Kindness",
    description: "Day-to-day acts of care that lift others up.",
  },
  {
    icon: Shield,
    title: "Courage",
    description: "Standing up, speaking out, being yourself.",
  },
  {
    icon: Users,
    title: "Inclusion",
    description: "Making space for everyone to belong.",
  },
  {
    icon: Megaphone,
    title: "Advocacy",
    description: "Working toward a more equitable community.",
  },
];

export function ScholarshipModal({
  trigger,
}: {
  trigger: (open: () => void) => React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {trigger(() => setIsOpen(true))}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-background rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">
                  Cazenovia Pride &middot; Class of {new Date().getFullYear()}
                </p>
                <h3 className="text-2xl font-bold text-foreground">
                  CAZ Pride <span className="text-rainbow">Scholarship</span>
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-secondary transition-colors shrink-0 ml-4"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Honoring a graduating senior who has shown kindness, courage,
                inclusion, or advocacy — and helped make our community a safer,
                more welcoming place for everyone.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <span className="text-lg block mb-1">&#128197;</span>
                  <span className="text-xs text-muted-foreground block">
                    Deadline
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    April 15, 2026
                  </span>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <span className="text-lg block mb-1">&#10022;</span>
                  <span className="text-xs text-muted-foreground block">
                    Award
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    $500
                  </span>
                </div>
                <div className="text-center p-3 bg-secondary rounded-lg">
                  <GraduationCap className="h-5 w-5 mx-auto mb-1 text-accent" />
                  <span className="text-xs text-muted-foreground block">
                    Eligibility
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    CHS Seniors
                  </span>
                </div>
              </div>

              {/* About */}
              <h4 className="text-lg font-bold text-foreground mb-3">
                About This Scholarship
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                Your story, told in your own way
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Cazenovia Pride celebrates and supports LGBTQIA+ students and
                allies in our community. This scholarship honors a graduating
                senior who has demonstrated kindness, courage, inclusion, or
                advocacy that helps create a safer and more welcoming world.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                We recognize that leadership looks many different ways —
                sometimes it is public action, and sometimes it is quiet
                compassion. We invite you to share your story in whatever way
                feels most authentic to you.
              </p>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <pillar.icon className="h-5 w-5 text-accent" />
                      <h5 className="font-semibold text-foreground">
                        {pillar.title}
                      </h5>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Apply button */}
            <div className="p-6 border-t border-border">
              <Button asChild variant="rainbow" className="w-full" size="lg">
                <a
                  href={config.scholarship.formURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
