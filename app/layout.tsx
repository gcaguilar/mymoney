import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "./components/NavBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
      <main className="p-4 max-w-7xl m-auto min-w-min-[300]">
        <NavBar />
        {children}
      </main>
      </body>
    </html>
  );
}
