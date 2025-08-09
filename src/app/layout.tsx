import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import NavigationWrapper from "@/components/NavigationWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sara Ferraa - Portfolio",
  description: "Personal portfolio of Sara Ferraa - Creative Developer & Designer",
  keywords: ["portfolio", "developer", "designer", "web development", "Sara Ferraa"],
  authors: [{ name: "Sara Ferraa" }],
  openGraph: {
    title: "Sara Ferraa - Portfolio",
    description: "Personal portfolio of Sara Ferraa - Creative Developer & Designer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <NavigationWrapper />
          <main className="relative">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
