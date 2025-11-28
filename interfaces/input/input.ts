import { UseFormRegister } from "react-hook-form"

export interface valuesSelect {
    value: string;
    label: string;

};

export interface PropsInput {
    label: string;
    typeElement: string | "text" | "email" | "password" | "number" | "date" ;
    idElement: string;
    listValues?: valuesSelect[];
    nameElement: string;
    // nameElement: "firstName" | "lastName" | "email" | "password" | "age" | "birthDate";
    register: UseFormRegister<any>;

};