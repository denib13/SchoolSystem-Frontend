import { School } from "./school";

export interface Headmaster {
    id?: string,
    name?: string, 
    middleName?: string,
    surname?: string,
    nationalIdNumber?: string,
    username?: string,
    password?: string,
    email?: string,
    school?: School
}