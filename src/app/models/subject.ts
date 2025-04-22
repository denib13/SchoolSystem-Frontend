import { Grade } from "./grade";
import { Teacher } from "./teacher";

export interface Subject {
    id?: string,
    name?: string,
    semester?: number,
    teacher?: Teacher,
    schoolClass?: Grade
}