import { Poppins } from 'next/font/google'
import Image from 'next/image'


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], 
})

export default function FooterComponentLogged() {
  return (
    <aside className="fixed top-0 right-0 h-screen w-95 bg-gray-800 z-50 flex flex-col">
      <div className="flex justify-center mt-4 items-center p-4 gap-2">
        <div className="flex items-center gap-2">
          <Image src="/fire icon.png" alt="Numero de vidas" width={60} height={60} className="h-15 w-15"/>
          
          <span className={`${poppins.className} font-semibold text-yellow-400`}>
            3
          </span>
        </div>

        <div className="flex items-center gap-2 " >
        <Image src="/corazon.png" alt="Numero de vidas" width={60} height={60} className="h-15 w-15"/>
          <span className={`${poppins.className} font-semibold text-red-500`}>
            3
          </span>
        </div>
      </div>

      <div>
        <div className='flex flex-col mb-10 border-4 border-rose-700 rounded-xl h-auto w-9/10 mx-auto overflow-hidden'>
            <div className="flex justify-between items-center px-4 py-2"> <h1 className={`${poppins.className} text-xl font-semibold text-gray-100`}> Desafíos </h1> <a href="#" className="text-blue-400 text-sm font-medium hover:underline"> Ver todos </a> </div>
            <div className="flex justify-center items-center px-4 py-2 m-2"> <a href="#" className="bg-rose-700 text-white py-2 flex justify-center items-center rounded-xl hover:bg-pink-800 transition w-3/4" > Desafío del día </a> </div>          
        </div>
        <div className='flex flex-col mt-10 mb-10 border-4 border-rose-700 rounded-xl  h-40 w-9/10 mx-auto overflow-hidden'>
            <div className="flex justify-between items-center px-4 py-2"> <h1 className={`${poppins.className} text-xl font-semibold text-gray-100`}> Perfil </h1> </div>
            <div className='flex'>
                <div className='ml-3 w-20 h-20 rounded-full bg-white overflow-hidden flex-shrink-0'>
                    <a href="#">
                    <Image src="/hombre muppet.png" alt="foto de perfil" className=''/>
                    </a>
                </div>
                
                <div className='ml-4 mt-2'>
                  <a href="#">
                    <h2 className={`${poppins.className} text-lg font-semibold text-gray-100 hover:underline`}> Juan Manuel </h2>
                  </a>
                    
                    <div className='flex gap-4 text-gray-100 mt-2'>
                        <h1>nivel: 1</h1>
                        <h1>racha: 356</h1>
                    </div>
                </div>
            </div>
                      
        </div>
      </div>

      <div>
        <div className='flex gap-4 justify-center mb-4 text-sm '>
            <div><a href="#" className='text-gray-500 hover:text-rose-700 font-semibold'>ACERCA DE</a></div>
            <div><a href="#" className='text-gray-500 hover:text-pink-700 font-semibold'>PRIVACIDAD</a></div>
            <div><a href="#" className='text-gray-500 hover:text-pink-700 font-semibold'>TERMINOS</a></div>
        </div>
        <div>
            <div className="text-center text-lg text-gray-500 font-semibold">
            Piglance © {new Date().getFullYear()}
            </div>
        </div>
      </div>
    </aside>
  );
}
