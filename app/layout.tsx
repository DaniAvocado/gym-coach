import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const sans = Barlow({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

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
      className={`${sans.variable} ${condensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-mono">{children}</body>
    </html>
  );
}
