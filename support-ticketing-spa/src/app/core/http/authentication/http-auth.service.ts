import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../../models/authenticate/authRequest.model';
import { AuthResponse } from '../../models/authenticate/authResponse.model';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {

  private resourceUrl = `${environment.apiHostUrl}/auth`;

  constructor(
    private http: HttpClient
  ) { }

  public authenticate(authRequest: AuthRequest) {
    debugger;
    return this.http.post<AuthResponse>(this.resourceUrl, authRequest);
  }

}
