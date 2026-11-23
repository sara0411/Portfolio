import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";

const displayFont = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-display",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

const textFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ferraasara.vercel.app"),
  title: "Sara Ferraa | Software Engineer",
  description:
    "Software engineer in Casablanca building backend and enterprise software: a C# and C++ test-automation product, and Java and Spring Boot applications.",
  alternates: { canonical: "/" },
  authors: [{ name: "Sara Ferraa" }],
  openGraph: {
    title: "Sara Ferraa | Software Engineer",
    description:
      "Software engineer in Casablanca building backend and enterprise software in C#, C++, Java and Spring Boot.",
    url: "/",
    siteName: "Sara Ferraa Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sara Ferraa | Software Engineer",
    description:
      "Software engineer in Casablanca building backend and enterprise software in C#, C++, Java and Spring Boot.",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4ede1" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1613" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sara Ferraa",
  jobTitle: "Software Engineer",
  url: "https://ferraasara.vercel.app",
  image: "https://ferraasara.vercel.app/sara-ferraa.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casablanca",
    addressCountry: "MA",
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "EMSI Casablanca" },
  worksFor: { "@type": "Organization", name: "Automai" },
  sameAs: [
    "https://github.com/sara0411",
    "https://www.linkedin.com/in/sara-ferraa-0aa73623a/",
  ],
};

const themeScript = `
  (function () {
    try {
      var preference = localStorage.getItem('portfolio-theme') || 'system';
      var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var resolved = preference === 'system' ? (dark ? 'dark' : 'light') : preference;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themePreference = preference;
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('motion');
      }
    } catch (_) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${textFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
