import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MemoryProvider } from "./context/MemoryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KandaiReal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,500,0,0"
        />
      </head>
      <body className={inter.className}>
        <MemoryProvider>{children}</MemoryProvider>
      </body>
    </html>
  );
}
