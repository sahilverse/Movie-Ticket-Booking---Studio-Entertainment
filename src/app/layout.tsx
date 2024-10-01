import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";



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
