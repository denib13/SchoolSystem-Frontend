import { Teacher } from "./teacher";
import { Student } from "./student";
import { Subject } from "./subject";

export interface Mark {
    id?: string,
    subject?: Subject,
    teacher?: Teacher,
    student?: Student,
    value?: number,
    createdAt?: Date
}