import { Token } from "./token.model";

export class LoginResponse {
    userId: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    email: string | undefined;
    token: Token | undefined;
}