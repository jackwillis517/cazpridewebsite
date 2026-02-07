"use client";

import { useState } from "react";
import { X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = "all" | "pride" | "community" | "fundraisers" | "youth";

interface GalleryImage {
  id: number;
  color: string;
  alt: string;
  category: Category;
  caption: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    color: "bg-pink-200",
    alt: "Volunteers setting up for community event",
    category: "community",
    caption: "Volunteers preparing for our annual community picnic",
  },
  {
    id: 2,
    color: "bg-purple-200",
    alt: "Pride parade in downtown Cazenovia",
    category: "pride",
    caption:
      "Pride parade celebrating love and inclusion in downtown Cazenovia",
  },
  {
    id: 3,
    color: "bg-blue-200",
    alt: "Community potluck dinner",
    category: "community",
    caption: "Monthly community potluck bringing neighbors together",
  },
  {
    id: 4,
    color: "bg-yellow-200",
    alt: "Youth art workshop",
    category: "youth",
    caption: "Creative expression workshop for LGBTQIA+ youth",
  },
  {
    id: 5,
    color: "bg-green-200",
    alt: "Fundraiser event",
    category: "fundraisers",
    caption: "Summer fundraiser supporting our community programs",
  },
  {
    id: 6,
    color: "bg-red-200",
    alt: "Candlelight vigil",
    category: "community",
    caption: "Candlelight vigil honoring our community",
  },
];

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All Photos" },
  { value: "pride", label: "Pride Events" },
  { value: "community", label: "Community Gatherings" },
  { value: "fundraisers", label: "Fundraisers" },
  { value: "youth", label: "Youth Programs" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-pride-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full shadow-sm mb-6">
              <Camera className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Photo Gallery
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Moments of <span className="text-rainbow">Pride</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Celebrating our community through photos of events, gatherings,
              and milestones.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={activeCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setLightboxImage(image)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <div
                    className={`w-full h-full ${image.color} transition-transform duration-500 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-primary-foreground font-medium">
                      {image.caption}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                No photos found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Upload CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Have Photos to Share?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            If you have photos from Caz Pride events that you&apos;d like to share,
            please contact us. We&apos;d love to feature your moments!
          </p>
          <Button variant="outline">Contact Us to Submit Photos</Button>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6 text-primary-foreground" />
          </button>
          <div
            className="max-w-5xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`w-full h-[60vh] ${lightboxImage.color} rounded-lg`}
            />
            <p className="text-center text-primary-foreground mt-4 text-sm">
              {lightboxImage.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
