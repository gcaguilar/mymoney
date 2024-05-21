import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import "../app/globals.css";


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
      <body>
        <div className="flex flex-col h-screen w-full">
          <NavBar />
          <main className="flex-grow p-4">{children}</main>
          <footer className="border box-content p-4 w-full">Footer</footer>
        </div>
      </body>
    </html>
  );
}
