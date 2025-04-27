import { Student } from "./student";
import { Subject } from "./subject";
import { Teacher } from "./teacher";

export interface Absence {
    id?: string,
    student?: Student,
    teacher?: Teacher,
    subject?: Subject,
    createdAt?: Date
}