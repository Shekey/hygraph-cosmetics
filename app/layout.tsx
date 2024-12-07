import { Inter } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/app/(ui)/GlobalHeader";
import GlobalFooter from "@/app/(ui)/GlobalFooter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalHeader />
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
