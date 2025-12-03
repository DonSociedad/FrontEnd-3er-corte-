"use client"

import EmerPageButton from "../atoms/buttons/emerPageButtonComponent";
import StoreComponent from "./storeComponent";

export default function WorkPlaceComponent() { 
    return (
        <div className="w-full h-full bg-gray-100 flex justify-center items-center flex-col">
            <h1 className=""></h1>
            <EmerPageButton buttonLabel="tienda" buttonStyle="rounded-b-lg bg-pink-400 hover:bg-pink-200 text-black font-medium py-2 px-4 transition absolute top-0 left-3/4">
            <div>
                <StoreComponent />
            
            </div>
        </EmerPageButton>
        </div>
    );
}


