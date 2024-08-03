import type { Metadata } from "next";
import { Mulish, Cormorant_Upright } from 'next/font/google';
import { Nav } from "@/components/Nav";
import "./global.css";

const cormorant_upright = Cormorant_Upright({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant-upright'
})

const mulish = Mulish({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mulish'
})

export const metadata: Metadata = {
  title: "AI Public Speaking Assistant",
  description: "An empathic AI public speaking and performance assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant_upright.variable} ${mulish.variable}`}>
      <body
        className={
          "flex flex-col min-h-screen"
        }
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
