import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/authContext";

export const metadata: Metadata = {
  title: "Piglance",
  description: "Buscando una mejor experiencia de usuario y entendimiento de temas financieros, siendo un ejemplo a los avances de conocimientos y avances hacia tus metas | Piglance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>  
          {children}
        </AuthProvider>  
      </body>
    </html>
  );
}
