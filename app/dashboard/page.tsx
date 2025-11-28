import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Administrador | Piglance",
    description: "Panel de administración para gestionar usuarios, contenidos y configuraciones de la plataforma | Piglance",
};

export default function homeDashboardPage() {
    return (
        <div>
            <h1>Home Dashboard</h1>
        </div>
    );
}