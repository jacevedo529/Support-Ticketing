import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../guards/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Get the auth token from the service.
    const authToken = this.authService.getAuthToken();

    // Throw error if no token is found or if about to expire
    // TODO: Handle Token expiring
    // if (!authToken?.value) {
    //   return throwError(() => new HttpErrorResponse({
    //     error: 'No Token available',
    //     status: HttpStatusCode.Unauthorized,
    //     url: req.url,
    //     headers: req.headers,
    //     statusText: 'Unauthorized'
    //   }));
    // }

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (authToken?.value) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken?.value as string}`)
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
