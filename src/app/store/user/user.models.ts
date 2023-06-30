import { User as FireUser } from '@angular/fire/auth';


export interface User extends FireUser { };

export interface EmailPasswordCredentials {
    email: string;
    password: string;
}
