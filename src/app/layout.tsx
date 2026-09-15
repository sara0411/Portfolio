import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  metadataBase: new URL("https://ferraasara.vercel.app"),
  title: "Sara Ferraa | Software Engineer",
  description:
    "Software engineer focused on backend systems and enterprise applications, with experience across Java, Spring Boot, C#, .NET, and applied AI.",
  alternates: { canonical: "/" },
  authors: [{ name: "Sara Ferraa" }],
  openGraph: {
    title: "Sara Ferraa | Software Engineer",
    description:
      "Recent graduate building backend systems, product interfaces, mobile applications, and applied AI tools.",
    url: "/",
    siteName: "Sara Ferraa Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sara Ferraa | Software Engineer",
    description:
      "Recent graduate building backend systems, product interfaces, mobile applications, and applied AI tools.",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eee9df" },
    { media: "(prefers-color-scheme: dark)", color: "#171816" },
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
    } catch (_) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
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
