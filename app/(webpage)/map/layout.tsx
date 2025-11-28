import HeaderComponent from "@/components/organism/headerComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mapa de aprendizaje | Piglance",
    description: "Empieza tu camino hacia un mundo lleno de conocimientos, no dejes que esté progreso se pierda | Piglance",
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
