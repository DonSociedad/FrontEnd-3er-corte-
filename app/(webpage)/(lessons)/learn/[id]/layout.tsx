
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Preguntas finanzas | Piglance",
    description: "Buscamos una compresión mejor para cada estudiante | Piglance",
};

export default function studioLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}