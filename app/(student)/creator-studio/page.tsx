'use client';

import Image from 'next/image';
import ButtonComponent from '@/components/atoms/buttonComponents';
import ShopComponent from '@/components/organism/creator-studio/shopComponent';
import { useCreatorStudio } from '@/hooks/lessons/useCreatorStudio';
import { FaShoppingCart, FaCoins } from 'react-icons/fa';

export default function CreatorStudioPage() {
  const {
    currentOutfit,
    currentEnvironment,
    userCoins,
    showShop,
    buyItem,
    toggleShop,
    applyItem,
  } = useCreatorStudio();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Tu Estudio Creativo</h1>

      <div className="relative w-full max-w-4xl h-[400px] bg-gray-700 rounded-lg shadow-xl overflow-hidden mb-8">
        {/* Fondo del entorno */}
        <Image
          src={currentEnvironment}
          alt="Entorno del cerdito"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
        />

        {/* Cerdito y su vestimenta */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative w-48 h-48"> 
            <Image
              src="/images/piggy/base-pig.png"
              alt="Avatar del cerdito"
              layout="fill"
              objectFit="contain"
            />
            {currentOutfit && (
              <Image
                src={currentOutfit}
                alt="Vestimenta del cerdito"
                layout="fill"
                objectFit="contain"
                className="absolute"
              />
            )}
          </div>
        </div>

        {/* Pantalla del computador */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1/3 h-1/3 bg-gray-800 border-2 border-gray-600 rounded-lg p-2 flex items-center justify-center z-20">
          <p className="text-gray-400 text-sm">Pantalla del Computador</p>
        </div>

        {/* Botón de la tienda */}
        <div className="absolute top-4 right-4 z-30">
          <ButtonComponent
            type={3} 
            content={<span className="flex items-center gap-2"><FaShoppingCart /> Tienda</span>}
            onClick={toggleShop}
          />
        </div>

        {/* Indicador de monedas */}
        <div className="absolute top-4 left-4 z-30 flex items-center bg-gray-800 p-2 rounded-lg text-white font-bold text-lg">
          <FaCoins className="mr-2 text-yellow-400" /> {userCoins}
        </div>
      </div>

      {/* Componente de la tienda */}
      <div className={`w-full max-w-4xl transition-all duration-300 ${showShop ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
        <ShopComponent onItemSelected={applyItem} userCoins={userCoins} onBuyItem={buyItem} />
      </div>
    </div>
  );
}