import { Grade } from "./grade";
import { School } from "./school";

export interface Student {
    id?: string,
    name?: string,
    middleName?: string,
    surname?: string,
    nationalIdNumber?: string,
    username?: string,
    password?: string,
    email?: string,
    school?: School,
    schoolClass?: Grade
}