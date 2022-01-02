import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../../models/authenticate/loginRequest.model';
import { LoginResponse } from '../../models/authenticate/loginResponse.model';
import { CreateAccountRequest } from '../../models/authenticate/createAccountRequest.model';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {

  private resourceUrl = `${environment.apiHostUrl}/Auth`;

  constructor(
    private http: HttpClient
  ) { }

  public authenticate(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.resourceUrl}/Login`, loginRequest);
  }

  public createAccount(createAccountRequest: CreateAccountRequest) {
    return this.http.post(`${this.resourceUrl}/Register`, createAccountRequest);
  }
}
