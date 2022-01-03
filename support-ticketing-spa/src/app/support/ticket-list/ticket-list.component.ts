import { Component, OnInit } from '@angular/core';
import { HttpTicketsService } from 'src/app/core/http/support/http-tickets.service';
import { Ticket } from 'src/app/core/models/support/ticket.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  public tickets: Ticket[] | undefined;

  constructor(
    private httpTicketsService: HttpTicketsService
  ) { }

  ngOnInit(): void {
    // TODO: Implement resolver

    this.httpTicketsService.getSupportTickets().subscribe({
      next: (value: Ticket[]) => {
        this.tickets = value;
        debugger;
      },
      error: (err) => {

      },
      complete: () => {

      }
    });
  }

}
