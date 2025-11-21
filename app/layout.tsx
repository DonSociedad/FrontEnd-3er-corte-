import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/authContext";

export const metadata: Metadata = {
  title: "Piglance",
  description: "Proyecto Final, buscando una mejor experiencia de usuario y entendimiento de temas financieros | Piglance",
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
