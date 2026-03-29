"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Resources", path: "/resources" },
  { name: "Events", path: "/events" },
  // { name: "Gallery", path: "/gallery" },
  { name: "Donate", path: "/donate" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  {
    icon: Instagram,
    href: "https://www.instagram.com/cazenoviapride",
    label: "Instagram",
  },
];

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      {/* Rainbow bar at top */}
      <div className="h-1 bg-rainbow-horizontal" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/favicon.png"
                alt="Caz Pride Logo"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <span className="font-bold text-lg text-foreground block">
                  Cazenovia Pride
                </span>
                <span className="text-sm text-muted-foreground">Inc.</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A registered 501(c)(3) nonprofit dedicated to fostering inclusion,
              visibility, and community celebration in Cazenovia and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@cazpride.org"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  info@cazpride.org
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  53 Albany Street
                  <br />
                  Cazenovia, NY
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Connect With Us
            </h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-md transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              <Heart className="h-4 w-4" />
              Support Our Mission
            </Link>
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground mb-2">
                Website Created By:
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Jack Willis</span>
                  <a
                    href="https://www.linkedin.com/in/jack-willis-3b0b18127/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jack Willis LinkedIn"
                    className="hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/jackwillis517"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Jack Willis GitHub"
                    className="hover:text-foreground transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Nolan Willis</span>
                  <a
                    href="https://www.linkedin.com/in/nolan-willis/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Nolan Willis LinkedIn"
                    className="hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://github.com/nolanwillis"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Nolan Willis GitHub"
                    className="hover:text-foreground transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Cazenovia Pride, Inc. All rights
              reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center md:text-right max-w-lg">
              Cazenovia Pride, Inc. is not affiliated with any for-profit
              business. We respect your privacy and do not sell or share
              personal information.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
