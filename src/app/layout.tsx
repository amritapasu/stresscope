import "@/styles/globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Prevent broken favicon */}
        <link rel="icon" href="data:," />
      </head>
      <body>{children}</body>
    </html>
  );
}
