import { Student } from "./student";

export interface Parent { 
    id?: string,
    name?: string,
    middleName?: string,
    surname?: string,
    nationalIdNumber?: string,
    username?: string,
    password?: string, 
    email?: string,
    children?: Student[]
}