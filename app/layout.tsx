import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/page-transition";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const condensed = Barlow_Condensed({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gym Coach — Tu Entrenador Personal",
  description: "Trackea tus entrenamientos, nutrición y progreso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn("dark", "h-full", "antialiased", condensed.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-mono">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
