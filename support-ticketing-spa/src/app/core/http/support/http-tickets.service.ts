import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../guards/auth.service';
import { Ticket } from '../../models/support/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class HttpTicketsService {

  private resourceUrl = `${environment.apiHostUrl}/Me/Support`

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public getSupportTickets(): Observable<Ticket[]> {
    const authorId = this.authService.getAuthSession()?.userId as string,
      httpParams = new HttpParams().set('authorId', authorId);

    return this.http.get<Ticket[]>(this.resourceUrl, { params: httpParams });
  }

  public getAllSupportTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.resourceUrl);
  }

  public getAssignedTickets(): Observable<Ticket[]> {
    const ownerId = this.authService.getAuthSession()?.userId as string,
      httpParams = new HttpParams().set('ownerId', ownerId);

    return this.http.get<Ticket[]>(this.resourceUrl, { params: httpParams });
  }
}
