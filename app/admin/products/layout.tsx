import HeaderComponent from "@/components/organism/headerComponent";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Accesorios| Piglance",
    description: "Alto nivel de personalizacion e interacción con nuestro usuario",
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
