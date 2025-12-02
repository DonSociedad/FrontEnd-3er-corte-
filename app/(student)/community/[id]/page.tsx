import { getPublicUserProfileService } from "@/libs/usersService";
import ProfileCard from "@/components/organism/profile/profileCardComponent";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
    params: Promise<{ id: string }>; 
};

export default async function PublicProfilePage({ params }: Props) {
    const { id } = await params;
    
    const { data: user, error } = await getPublicUserProfileService(id);

    if (error || !user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 gap-4">
                <div className="text-2xl font-bold text-gray-400">Usuario no encontrado 🕵️‍♂️</div>
                <Link href="/community" className="text-pink-500 hover:underline font-bold">Volver a la comunidad</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fff0f5] flex flex-col">
            
            {/* Header simple para volver */}
            <div className="p-6 md:px-10 md:py-8">
                <Link 
                    href="/community" 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-pink-500 font-bold transition-colors mb-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Volver a la comunidad
                </Link>
            </div>

            {/* Renderizamos el Perfil Reutilizable */}
            <div className="flex-1 flex items-center pb-20 px-4">
                <ProfileCard 
                    user={user} 
                    isOwnProfile={false} // <--- ESTO ES LA CLAVE
                    // No pasamos onEquip porque no pueden editar
                />
            </div>

        </div>
    );
}