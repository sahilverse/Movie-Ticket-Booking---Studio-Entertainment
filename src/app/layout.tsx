import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react"


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
      <body >

        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </SessionProvider>

      </body>
    </html>
  );
}
