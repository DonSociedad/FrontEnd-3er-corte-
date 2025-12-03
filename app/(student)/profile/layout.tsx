import HeaderComponent from "@/components/organism/headerComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Perfil | Piglance",
    description: "Modifica e interactua con tu avatar y entiende los avances de tu conocimiento",
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
