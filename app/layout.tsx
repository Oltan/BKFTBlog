import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "BKFT Blog - Sci-Fi & Fantasy Culture Club",
  description: "University science fiction and fantasy culture club blog featuring news, reviews, events, and RPG guides",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="mt-20 py-8 border-t border-gray-300 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p>&copy; 2024 BKFT - Science Fiction & Fantasy Culture Club</p>
              <p className="text-sm mt-2 opacity-70">
                Exploring the realms of imagination
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
