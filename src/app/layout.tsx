import type { Metadata } from "next";
import "./globals.css";
import { MemoryProvider } from "./context/MemoryContext";

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
      <body className="max-w-screen-sm mx-auto">
        <MemoryProvider>{children}</MemoryProvider>
      </body>
    </html>
  );
}
