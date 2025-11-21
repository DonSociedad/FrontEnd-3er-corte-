'use client';

export default function ProfileComponent() {
  return (
    <div>
        <div className="grid grid-cols-2 h-100  gap-4 items-center justify-center p-4">
            <div className="flex justify-center">
                <h1>icono</h1>
                <div className="absolute top-0 left-4/10 bg-yellow-400 rounded-b-lg py-2 px-4">
                    monedas
                </div>
            </div>
            <div className="flex justify-center rounded-xl bg-gray-700 p-4 h-9/10 items-center">
                <h1>accesorios</h1>
            </div>
            
        </div>
    </div>
  );
}
