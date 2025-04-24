import { Student } from "./student";
import { Subject } from "./subject";
import { Teacher } from "./teacher";

export interface Remark {
    id?: string, 
    teacher?: Teacher,
    student?: Student,
    subject?: Subject,
    createdAt?: Date,
    heading?: string, 
    body?: string 
}