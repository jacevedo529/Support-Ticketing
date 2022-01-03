import { Token } from "./token.interface";

export interface AuthSession {
    userId: string | undefined;
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    token: Token | undefined;
}