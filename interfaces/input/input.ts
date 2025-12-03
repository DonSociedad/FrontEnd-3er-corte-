import { ChangeEvent } from "react";
import { UseFormRegister } from "react-hook-form"
import { valuesSelect } from "./valuesSelect";


export interface PropsInput {
    label?: string;
    typeElement: string | "text" | "email" | "password" | "number" | "date"  | "title" | "order";
    idElement: string;
    listValues?: valuesSelect[];
    nameElement: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    // nameElement: "firstName" | "lastName" | "email" | "password" | "age" | "birthDate";
    register: UseFormRegister<any>;
    placeholder?: string;

};