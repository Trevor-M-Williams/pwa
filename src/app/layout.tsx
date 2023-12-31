import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Menu from "@/components/menu";
import React from "react";
import { TodoProvider } from "@/lib/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next PWA",
  description: "Next PWA",
  generator: "Next.js",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TodoProvider>
          <div className="fixed inset-0 flex flex-col">
            {/* <Navbar /> */}
            <div className="flex-grow p-4">{children}</div>
            <Menu />
          </div>
        </TodoProvider>
      </body>
    </html>
  );
}
