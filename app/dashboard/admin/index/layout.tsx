import HeaderComponent from "@/components/organism/headerComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Creación de ejercicios | Piglance",
    description: "Tipo de ejercicios a aplicar | Piglance",
};

export default function studioLayout({
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
