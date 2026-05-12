// This configuration file contains all the links to images used on the site and board member information
// Swap out photos and board members in this file
// this is a change
import type { LucideIcon } from "lucide-react";
import {
  Shield,
  BookOpen,
  Users,
  Sun,
  Snowflake,
  Heart,
  Target,
} from "lucide-react";
const GOOGLE_DRIVE_BASE_URL = "https://drive.google.com/uc?export=view&id=";

type boardMember = {
  name: string;
  pronouns?: string;
  role: string;
  bio: string;
  color: string;
  photo?: string;
};

type pridefest = {
  imgs: {
    hero: string;
    vendor: string;
    volunteer: string;
  };
  formURLs: {
    vendorFormURL: string;
    volunteerFormURL: string;
  };
};

type prideGuide = {
  title: string;
  url: string;
  seasonIcon: LucideIcon;
  image: string;
};

type crisisHotline = {
  name: string;
  phone: string;
  text?: string;
  description: string;
  url: string;
};

type supportOrganization = {
  name: string;
  description: string;
  url: string;
  icon: LucideIcon;
};

type contact = {
  formURL: string;
  formNameId: string;
  formEmailId: string;
  formMessageId: string;
};

export const config: {
  hero: string;
  gallery: string[];
  scholarship: {
    enabled: boolean;
    img: string;
    formURL: string;
  };
  prideFest: pridefest;
  prideGuides: prideGuide[];
  boardMembers: boardMember[];
  values: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
  crisisHotlines: crisisHotline[];
  supportOrganizations: supportOrganization[];
  contact: contact;
} = {
  hero: `${GOOGLE_DRIVE_BASE_URL}1f62TLyKIKb2j59xSg-6mBS34-_8yTHiC`,
  gallery: [
    `${GOOGLE_DRIVE_BASE_URL}1eUWGA1tGrsAZaRSVFTrtw_PTDmdNvUZQ`,
    `${GOOGLE_DRIVE_BASE_URL}1d-Po939hznYkPAF-6m04Pbqvo42zgSYt`,
    `${GOOGLE_DRIVE_BASE_URL}1MNn1HYBTxU_bmBzjBVL3ufAVzjk06Khk`,
    `${GOOGLE_DRIVE_BASE_URL}10akn6iMKdG5yiftX9AlJKhuN9apQJy4D`,
    `${GOOGLE_DRIVE_BASE_URL}1-5T1YJp0M_m4AJz6qYXqUGwK_0NYy1nW`,
    `${GOOGLE_DRIVE_BASE_URL}1jPsYeXSeqMtpmqOJT4-2YcKRQR8QWxpX`,
  ],
  scholarship: {
    enabled: true,
    img: `${GOOGLE_DRIVE_BASE_URL}1U5cgF6FvasKZ5gHP2q9s-oeG3ur3qhcc`,
    formURL:
      "https://docs.google.com/forms/d/1lcTNowEO_NreG8IhZOqgwnCX0mMNfkpYuFty3lEvP20/viewform"
  },
  prideFest: {
    imgs: {
      hero: `${GOOGLE_DRIVE_BASE_URL}1eqw4V8wYpVfhIy3yNmG0VjsBmAVAyN9Q`,
      vendor: `${GOOGLE_DRIVE_BASE_URL}1wKQMou8w_1SyAHwoEmerfd4N9GoxX6f8`,
      volunteer: `${GOOGLE_DRIVE_BASE_URL}1QwksJOdZFCOdzLVuCPfH50Q3kJ6TQpBy`,
    },
    formURLs: {
      vendorFormURL:
        "https://docs.google.com/forms/d/e/1FAIpQLScc7JN3K5focq2bKX6qH9C24EIuMcVrKXhVYUwNupqbzfBDgQ/viewform",
      volunteerFormURL:
        "https://docs.google.com/forms/d/e/1FAIpQLSfe66iLoaaOV0GFs0yqvg-_da1anWFs4piWh_7sT8fyt-dBMw/viewform",
    },
  },
  prideGuides: [
    {
      title: "Winter 2025–2026",
      url: "https://drive.google.com/file/d/1l--CNHeEprtXvsP3U0RyAke9lVeghI7r/preview",
      seasonIcon: Snowflake,
      image: `${GOOGLE_DRIVE_BASE_URL}1Me2Dmuw8suFTFuasmYCn9MpSFTSi18e7`,
    },
    {
      title: "Summer 2025",
      url: "https://drive.google.com/file/d/1DPRJZ8tIOzb0NetZwTFhV8RarVisIlWp/preview",
      seasonIcon: Sun,
      image: `${GOOGLE_DRIVE_BASE_URL}1lsLfViQnah2c_ShWwnvG5GfRg3xdKfzY`,
    },
    {
      title: "Summer 2024",
      url: "https://drive.google.com/file/d/1jPgpAJnRKT9AXzlplGcqtSmUwTqOK7n4/preview",
      seasonIcon: Sun,
      image: `${GOOGLE_DRIVE_BASE_URL}1YWNjLHRp8p1LBW4gm99CoGI1rd732BN4`,
    },
  ],
  boardMembers: [
    {
      name: "Danielle Synborski",
      pronouns: "She/Her",
      role: "President",
      bio: "Rooted in the belief that we are all part of one human family, Danielle is committed to building bridges across differences and fostering a community grounded in love, understanding, and belonging. A devoted wife and mom, she finds her greatest growth when stepping outside her comfort zone to stand up for equity and create new connections.",
      color: "bg-pink-200",
      photo: `${GOOGLE_DRIVE_BASE_URL}1vCLnPm3XDrQ7_d2UXaMZZ9cQFhJ_FzYa`,
    },
    {
      name: "Meg Tobin",
      pronouns: "She/Her",
      role: "Vice President",
      bio: "Meg is a somatic psychotherapist and retreat leader passionate about creating safe, inclusive spaces where everyone can breathe, heal, and belong. She believes everyone deserves to feel seen, safe, and celebrated exactly as they are, and that a community rooted in love and authenticity changes lives.",
      color: "bg-blue-200",
      photo: `${GOOGLE_DRIVE_BASE_URL}1KOq8ABUC55pm37I4PkzCPirpmq9U6Ag5`,
    },
    {
      name: "Matt Synborski",
      pronouns: "He/Him",
      role: "Treasurer",
      bio: "Matt is proud to serve Cazenovia Pride because everyone is welcome here—a value we all should try to uphold. He's a husband, chief technology officer at a Syracuse company, and dad to four kids.",
      color: "bg-purple-200",
      photo: `${GOOGLE_DRIVE_BASE_URL}11hLqWDI0RUrRTXz8xrB5L7tER3CW_FLH`,
    },
    {
      name: "Alyssa Biviano",
      pronouns: "She/Her",
      role: "Secretary",
      bio: "Alyssa is part of Caz Pride because it's more important than ever to be involved in her local community. Her sons have two moms, and she wants them to see that their family is valid and valued in this community.",
      color: "bg-green-200",
      photo: `${GOOGLE_DRIVE_BASE_URL}1WMQTM_4x4YQPjGBd-1d0xt2YjM0HtRST`,
    },
    {
      name: "Karina Argentine",
      pronouns: "She/Her",
      role: "Director of Programs & Events",
      bio: "Karina joined the board because it represents community, inclusion, and belonging—values she wants her son to grow up seeing in action. She's a wife, mom to a busy toddler and rescue pup, and lifelong event planner who believes in the power of bringing people together for something bigger than ourselves.",
      color: "bg-yellow-200",
      photo: `${GOOGLE_DRIVE_BASE_URL}1G6_sRLxsyCLRF7o88bV8vQGEfzR0DRtx`,
    },
    {
      name: "Beth Ann Kempf",
      pronouns: "She/Her",
      role: "Director at Large",
      bio: "Beth Ann is a longtime central New York resident, educator, and community advocate with nearly 25 years in public education. She is also the owner of a local business, BAK Pack Photography. She's honored to serve on the Cazenovia Pride Board and is passionate about supporting visibility, belonging, and joy for the LGBTQ+ community and its allies.",
      color: "bg-red-200",
      photo: `${GOOGLE_DRIVE_BASE_URL}1ycmvVHO21Z5yx49CxJNWktpveSAy2Hfw`,
    },
  ],
  values: [
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
  ],
  crisisHotlines: [
    {
      name: "Trans Lifeline",
      phone: "877-565-8860",
      text: "",
      description:
        "You can talk openly without fear of 911 being called on you. Peer support hotline run by and for trans people.",
      url: "https://translifeline.org",
    },

    {
      name: "The Trevor Project",
      phone: "1-866-488-7386",
      text: 'Text "Start" to 678678',
      description:
        "Crisis intervention and suicide prevention for LGBTQ+ youth.",
      url: "https://www.thetrevorproject.org",
    },
    {
      name: "988 Suicide & Crisis Lifeline",
      phone: "988",
      text: "",
      description: "24/7 national crisis support.",
      url: "https://988lifeline.org",
    },
  ],
  supportOrganizations: [
    {
      name: "PFLAG",
      description:
        "Support, education, and advocacy for LGBTQ+ people, their parents, and allies.",
      url: "https://pflag.org",
      icon: Users,
    },
    {
      name: "GLAAD",
      description:
        "Media advocacy organization accelerating acceptance for LGBTQ+ people.",
      url: "https://www.glaad.org",
      icon: BookOpen,
    },
    {
      name: "Human Rights Campaign",
      description:
        "Working for LGBTQ+ equality through advocacy, education, and outreach.",
      url: "https://www.hrc.org",
      icon: Shield,
    },
    {
      name: "Lambda Legal",
      description:
        "Legal advocacy for LGBTQ+ rights and civil rights for people with HIV.",
      url: "https://www.lambdalegal.org",
      icon: Shield,
    },
  ],
  contact: {
    formURL:
      "https://docs.google.com/forms/d/e/1FAIpQLSfe6C61JrR-f9zLXxqD3SnM457Ba8BNqMTZIrszMVmLuUVEag/formResponse",
    formNameId: "entry.1301716392",
    formEmailId: "entry.1447431938",
    formMessageId: "entry.1515610886",
  },
};
