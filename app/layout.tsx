import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import Navbar from "@/components/Navbar";
// import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Verbis",
  description: "Influencer and Hotel Collaboration Software",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        {/* <ThemeProvider attribute="class" defaultTheme="dark"> */}
        <Navbar />
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
