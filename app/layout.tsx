import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piglance",
  description: "Proyecyto Final, buscando una mejor experiencia de usuario y entendimiento de temas financieros | Piglance",
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
