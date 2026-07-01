import type { Metadata } from "next";
import { Playfair_Display, Quicksand, Crimson_Text } from "next/font/google";
import "./globals.css";
import DarkModeToggle from "@/components/DarkModeToggle";
import { ThemeScript } from "@/components/ThemeScript";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-story",
});

export const metadata: Metadata = {
  title: "Once Upon a Hello World",
  description: "Welcome to my storybook portfolio - a tale of code, creativity, and dreams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <ThemeScript />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Hide body until theme is determined */
            body { visibility: hidden; }
            
            /* Show body once theme is applied */
            body.theme-loaded { visibility: visible; }
            
            /* Prevent any flash during theme detection */
            html { background-color: transparent; }
          `,
        }} />
      </head>
      <body
        suppressHydrationWarning
        className={`${playfairDisplay.variable} ${quicksand.variable} ${crimsonText.variable} bg-parchment-100 dark:bg-ink-900 text-ink-800 dark:text-ink-100 font-body leading-relaxed transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
      >
        <DarkModeToggle />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
