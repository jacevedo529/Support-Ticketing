import { Token } from "./token.interface";

export interface AuthSession {
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    email: string | undefined;
    token: Token | undefined;
}