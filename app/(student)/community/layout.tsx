import HeaderComponent from "@/components/organism/headerComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Comunidad| Piglance",
    description: "Conoce personas con quienes puedes compartir tus conocimientos y aprendizaje",
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
