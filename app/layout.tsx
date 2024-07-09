import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Nav } from "@/components/Nav";
import { cn } from "@/utils";
import "./global.css";

export const metadata: Metadata = {
  title: "Cicero",
  description: "Your personal, empathetic audience for public speaking practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen"
        )}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
