import { Injectable } from "@angular/core";
import { AuthSession } from "../../interfaces/auth-session.interface";
import { DataStorageBaseService } from "./data-storage-base.service";

@Injectable({
    providedIn: 'root'
})
export class AuthSessionStorageService extends DataStorageBaseService {
    private readonly authSessionKey = 'authSession';

    constructor() {
        super();
    }

    public set(authSession: AuthSession) {
        this.clear();
        super.baseSet(this.authSessionKey, authSession);
    }
    public get(): AuthSession | undefined {
        return super.baseGet(this.authSessionKey);
    }
    public clear() {
        super.baseRemove(this.authSessionKey);
    }
}