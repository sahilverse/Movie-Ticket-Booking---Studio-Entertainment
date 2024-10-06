import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from 'react-hot-toast';




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


        <Navbar />
        {children}
        <Footer />
        <Toaster />



      </body>
    </html>
  );
}
