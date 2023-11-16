import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
  title: "Mi dinero",
  description: "A donde se me va mi dinero",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-full flex flex-col lg:flex-row">
        <NavBar />
        <main className="flex-1 p-5">{children}</main>
      </body>
    </html>
  );
}
