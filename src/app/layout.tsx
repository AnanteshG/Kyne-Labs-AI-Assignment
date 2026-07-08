import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyne Labs AI Assignment",
  description: "Regulated banking operations frontend prototype"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
