import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Studio Entertainment",
  description: "Book your tickets now online!",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >

        <Navbar />
        {children}




      </body>
    </html>
  );
}
