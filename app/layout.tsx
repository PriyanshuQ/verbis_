import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import Navbar from "@/components/Navbar";
// import Providers from "@/components/Providers";
// import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Verbis",
  description: "Influencer and Hotel Collaboration Software",
  icons: {
    icon: "/assets/icons/logo-full.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      {/* <Providers> */}
      <body
        className={cn(
          "min-h-screen font-sans antialiased grainy",
          inter.className
        )}
      >
        {/* <ThemeProvider attribute="class" defaultTheme="dark"> */}
        <Navbar />
        <div className="pt-14">{children}</div> 
        {/* </ThemeProvider> */}
      </body>
      {/* </Providers> */}
    </html>
  );
}
