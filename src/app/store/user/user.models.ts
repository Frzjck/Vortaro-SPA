import firebase from "firebase/compat/app";


export interface User extends firebase.User { };

export interface EmailPasswordCredentials {
    email: string;
    password: string;
}
