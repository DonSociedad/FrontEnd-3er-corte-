import HeaderComponent from "@/components/organism/headerComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avatar",
  description: "Creación de avatar | Piglance",
};

export default function studioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeaderComponent />
          {children}
        <HeaderComponent />
      </body>
    </html>
  );
}
