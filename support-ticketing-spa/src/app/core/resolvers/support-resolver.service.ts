import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpTicketsService } from '../http/support/http-tickets.service';

@Injectable({
  providedIn: 'root'
})
export class SupportResolverService implements Resolve<any> {

  constructor(
    private httpTicketsService: HttpTicketsService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.httpTicketsService.getAllSupportTickets();
  }
}
