import { Injectable } from '@angular/core';
import { HttpAuthService } from '../http/authentication/http-auth.service';
import { Token } from '../interfaces/token.interface';
import { AuthRequest } from '../models/authenticate/authRequest.model';
import { AuthResponse } from '../models/authenticate/authResponse.model';
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

  // store the URL so we can rdirect after logging in
  redirectUrl: string | null = null;

  public authenticate(authRequest: AuthRequest) {
    this.httpAuthService.authenticate(authRequest).subscribe({
      next: (authResponse: AuthResponse) => {
        // Store the authResponse
        this.authSessionStorageService.set(authResponse);
      },
      error: (err) => {
        // TODO: Determine how to best handle errors
      }
    });
  }

  public getAuthToken(): Token | undefined {
    // Retrieve authSession from storage
    const authSession = this.authSessionStorageService.get();

    return authSession?.token ?? undefined;
  }
}
