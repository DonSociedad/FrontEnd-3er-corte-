import HeaderComponent from "@/components/organism/headerComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avatar | piglance",
  description: "Creación de avatar | Piglance",
};

export default function studioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>
        <HeaderComponent />
          {children}
        <HeaderComponent />
        </>
  );
}
