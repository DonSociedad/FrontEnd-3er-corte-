'use client'

import { valuesSelect } from "@/interfaces/input";
import { PropsInput } from "@/interfaces/input";


export default function InputComponent({ label, typeElement, idElement, listValues, nameElement, register }: PropsInput) {
    return (
        <>
        <label htmlFor={idElement} className="font-semibold">
            {label}
        </label>
        {
            listValues?.length ? (
            <select id={idElement} {...register(nameElement)}>
                {listValues.map(item => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
                ))}
            </select>
            ) : (
            <input
                {...register(nameElement)}
                type={typeElement}
                id={idElement}
                className="mt-1 w-full border border-gray-400 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            )

        }

        </>

    ); 
    
};