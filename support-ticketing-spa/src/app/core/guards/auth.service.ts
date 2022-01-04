import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpAuthService } from '../http/authentication/http-auth.service';
import { AuthSession } from '../interfaces/auth-session.interface';
import { Token } from '../interfaces/token.interface';
import { LoginRequest } from '../models/authenticate/loginRequest.model';
import { LoginResponse } from '../models/authenticate/loginResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authSessionKey = 'authSession';
  constructor(
    private httpAuthService: HttpAuthService,
    private router: Router
  ) { }

  /**
   * Determines if user is logged in by checking if there's an authSession available
   */
  get isLoggedIn(): boolean {
    return this.getAuthToken() !== undefined;
  }

  // Store the URL so we can rdirect after logging in
  redirectUrl: string | null = null;

  public authenticate(loginRequest: LoginRequest): Observable<boolean> {
    return new Observable((observer) => {
      this.httpAuthService.authenticate(loginRequest).subscribe({
        next: (loginResponse: LoginResponse) => {
          // Store the loginResponse
          const authSessionString = JSON.stringify(loginResponse);
          sessionStorage.setItem(this.authSessionKey, authSessionString);

          // Return the logged in status
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

  public logout() {
    sessionStorage.removeItem(this.authSessionKey);
    this.router.navigate(['login'])
  }

  public getAuthSession(): AuthSession | undefined {
    // Retrieve authSession from storage
    const authSessionString = sessionStorage.getItem(this.authSessionKey);
    let authSession: AuthSession;
    if (authSessionString) {
      authSession = JSON.parse(authSessionString);
      return authSession ?? undefined;
    }
    return undefined;
  }

  public getAuthToken(): Token | undefined {
    return this.getAuthSession()?.token ?? undefined;
  }
}
