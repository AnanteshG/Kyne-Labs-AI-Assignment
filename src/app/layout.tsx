import type { Metadata } from "next";
import "@xyflow/react/dist/style.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyne Labs AI Assignment",
  description: "Regulated banking operations frontend prototype"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
try {
  const theme = localStorage.getItem("kyne-theme");
  if (theme !== "light") document.documentElement.classList.add("dark");
} catch {}
`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
