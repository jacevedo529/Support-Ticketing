import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../../models/support/ticket.model';
import { AuthSessionStorageService } from '../../services/data-services/auth-session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpTicketsService {

  private resourceUrl = `${environment.apiHostUrl}/Support`
  //private meResourceUrl = `${environment.apiHostUrl}/Me/Support`
  constructor(
    private http: HttpClient,
    private authSessionStorageService: AuthSessionStorageService
  ) { }

  public getSupportTickets(): Observable<Ticket[]> {
    const authorId = this.authSessionStorageService.get()?.userId as string,
      httpParams = new HttpParams().set('authorId', authorId);

    return this.http.get<Ticket[]>(this.resourceUrl, { params: httpParams });
  }

  public getAssignedTickets(): Observable<Ticket[]> {
    const ownerId = this.authSessionStorageService.get()?.userId as string,
      httpParams = new HttpParams().set('ownerId', ownerId);

    return this.http.get<Ticket[]>(this.resourceUrl, { params: httpParams });
  }
}
