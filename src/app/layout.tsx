import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import AuthProvider from "@/contexts/AuthContext";


export const metadata: Metadata = {
  title: "Studio Entertainment",
  description: "Book your tickets now!",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>



      </body>
    </html>
  );
}
