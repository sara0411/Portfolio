import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import NavigationWrapper from "@/components/NavigationWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sara Ferraa — Software Engineer",
  description: "Software Engineer working across backend development, enterprise platforms, automation, and applied AI.",
  keywords: [
    "Software Engineer",
    "Backend Developer",
    "ServiceNow Developer",
    "Python",
    "Java",
    "C#",
    "ASP.NET Core",
    "Machine Learning",
    "Sara Ferraa"
  ],
  authors: [{ name: "Sara Ferraa" }],
  openGraph: {
    title: "Sara Ferraa — Software Engineer",
    description: "Software Engineer working across backend systems, enterprise platforms, automation, and applied AI.",
    url: "https://saraferraa.vercel.app",
    siteName: "Sara Ferraa Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sara Ferraa — Software Engineer",
    description: "Software Engineer working across backend systems, enterprise platforms, automation, and applied AI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased selection:bg-accent/20`}>
        <ThemeProvider>
          <NavigationWrapper />
          <main className="relative min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
