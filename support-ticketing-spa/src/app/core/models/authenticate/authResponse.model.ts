import { Token } from "./token.model";

export class AuthResponse {
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    email: string | undefined;
    token: Token | undefined;
}