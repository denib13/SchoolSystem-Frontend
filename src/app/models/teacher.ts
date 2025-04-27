import { School } from "./school";
import { Subject } from "./subject";

export interface Teacher {
    id?: string,
    name?: string,
    middleName?: string,
    surname?: string,
    nationalIdNumber?: string,
    username?: string,
    password?: string,
    email?: string,
    schools?: School[],
    subjects?: Subject[]
}