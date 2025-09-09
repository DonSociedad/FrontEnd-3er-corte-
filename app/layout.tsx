import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duolingo-finanzas-home",
  description: "Proyecto basado en un duolingo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
