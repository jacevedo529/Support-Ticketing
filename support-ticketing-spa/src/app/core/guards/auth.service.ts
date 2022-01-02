import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpAuthService } from '../http/authentication/http-auth.service';
import { Token } from '../interfaces/token.interface';
import { LoginRequest } from '../models/authenticate/loginRequest.model';
import { LoginResponse } from '../models/authenticate/loginResponse.model';
import { AuthSessionStorageService } from '../services/data-services/auth-session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpAuthService: HttpAuthService,
    private authSessionStorageService: AuthSessionStorageService
  ) { }

  /**
   * Determines if user is logged in by checking if there's an authSession available
   */
  get isLoggedIn(): boolean {
    return this.authSessionStorageService.get() !== undefined;
  }

  // Store the URL so we can rdirect after logging in
  redirectUrl: string | null = null;

  public authenticate(loginRequest: LoginRequest): Observable<boolean> {
    return new Observable((observer) => {
      this.httpAuthService.authenticate(loginRequest).subscribe({
        next: (loginResponse: LoginResponse) => {
          // Store the loginResponse
          this.authSessionStorageService.set(loginResponse);
          observer.next(this.isLoggedIn);
          observer.complete();
        },
        error: (err) => {
          // TODO: Determine how to best handle errors

          observer.error();
        }
      });
    });

  }

  public getAuthToken(): Token | undefined {
    // Retrieve authSession from storage
    const authSession = this.authSessionStorageService.get();

    return authSession?.token ?? undefined;
  }
}
