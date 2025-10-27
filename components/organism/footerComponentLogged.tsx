import { Poppins } from 'next/font/google'


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], 
})

export default function FooterComponentLogged() {
  return (
    <aside className="fixed top-0 right-0 h-screen w-95 bg-pink-100 z-50 flex flex-col">
      <div className="flex justify-center mt-4 items-center p-4 gap-2">
        <div className="flex items-center gap-2">
          <img src="/fire icon.png" alt="Numero de vidas" className="h-7 w-auto" />
          
          <span className={`${poppins.className} font-semibold`}>
            3
          </span>
        </div>

        <div className="flex items-center gap-2">
          <img src="/corazon.png" alt="Numero de vidas" className="h-7 w-auto" />
          <span className={`${poppins.className} font-semibold`}>
            3
          </span>
        </div>
      </div>

      <div>
        <div className='flex flex-col mb-10 border-4 border-pink-300 h-40 w-9/10 mx-auto overflow-hidden'>
            <div className="flex justify-between items-center px-4 py-2"> <h1 className={`${poppins.className} text-xl font-semibold text-gray-800`}> Desafíos </h1> <a href="#" className="text-pink-500 text-sm font-medium hover:underline"> Ver todos </a> </div>
            <div className=""> <a href="#" className="bg-pink-900 text-white py-2 flex justify-center items-center rounded-xl hover:bg-pink-800 transition" > Desafío del día </a> </div>          
        </div>
        <div className='flex flex-col mt-10 mb-10 border-4 border-pink-300 h-40 w-9/10 mx-auto overflow-hidden'>
            <div className="flex justify-between items-center px-4 py-2"> <h1 className={`${poppins.className} text-xl font-semibold text-gray-800`}> Perfil </h1> </div>
            <div className='flex'>
                <div className='ml-3 w-20 h-20 rounded-full border-4 border-pink-400 overflow-hidden flex-shrink-0'>
                    <a href="#">
                    <img src="/hombre muppet.png" alt="foto de perfil" className=''/>
                    </a>
                </div>
                
                <div className='ml-4 mt-2'>
                    <h2 className={`${poppins.className} text-lg font-semibold text-gray-800`}> Juan Manuel </h2>
                    <div className='flex gap-4'>
                        <h1>nivel: 1</h1>
                        <h1>racha: 356</h1>
                    </div>
                </div>
            </div>
                      
        </div>
      </div>

      <div>
        <div className='flex gap-4 justify-center mb-4 text-sm '>
            <div><a href="#" className='text-gray-600 hover:text-pink-900 font-semibold'>ACERCA DE</a></div>
            <div><a href="#" className='text-gray-600 hover:text-pink-900 font-semibold'>PRIVACIDAD</a></div>
            <div><a href="#" className='text-gray-600 hover:text-pink-900 font-semibold'>TERMINOS</a></div>
        </div>
        <div>
            <div className="text-center text-lg text-gray-600 font-semibold">
            Piglance © {new Date().getFullYear()}
            </div>
        </div>
      </div>
    </aside>
  );
}
