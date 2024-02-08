import { Time } from "@angular/common";

export class UserCommand{
    id?: string;
    name!: string;
    surname!: string;
    email!: string;
    password!: string;
    birthDate!: number;
    phone!: string;
    roles?: 'ROLE_USER' | 'ROLE_ADMIN'
    token?: string;
    visitDuration:Time;
    specialization!:string;
    url:string;
    status:string;
}