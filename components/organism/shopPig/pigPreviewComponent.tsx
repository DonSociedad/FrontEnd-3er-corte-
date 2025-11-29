import PigAvatar from '@/components/molecules/pig/pigAvatar';
import { IUserProfile } from '@/interfaces/users/user';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PigPreviewProps {
    user: IUserProfile | null;
}

export default function PigPreview({ user }: PigPreviewProps) {
    const router = useRouter();
    // Skeleton loading state
    if (!user) {
        return <div className="w-full aspect-square bg-gray-100 rounded-3xl animate-pulse" />;
    }

    return (
        <div className="flex flex-col items-center sticky top-10">
            {/* Tarjeta de Saldo */}

            <div className='mr-55 mt-[-45] w-full flex justify-start'>
            <button 
                onClick={() => router.back()} 
                className="flex items-center  gap-2 text-gray-500 hover:text-[#f0b9a8] transition-colors font-bold group"
            >
                <ArrowLeftIcon className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-1" />
                <span className="text-lg">
                    Volver
                </span>
            </button>   
            </div>

            <div className="mb-6 bg-white px-8 py-3 rounded-2xl border-2 border-b-4 border-gray-200 shadow-sm flex items-center gap-3 mt-30">
                <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-600 shadow-inner" />
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Tus Monedas</p>
                    <p className="text-2xl font-black text-gray-700 leading-none">{user.coins}</p>
                </div>
            </div>

            {/* Avatar usando el componente PigAvatar como en el perfil */}
            <div className="relative transition-all duration-500 hover:scale-105">
                <PigAvatar config={user.pig.equipped} />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-6 bg-black/10 rounded-[100%] blur-sm z-[-1]"></div>
            </div>

            <p className="mt-4 text-gray-400 font-medium text-sm text-center px-4">
                ¡Compra accesorios para personalizar a tu cerdito financiero!
            </p>
        </div>
    );
}
