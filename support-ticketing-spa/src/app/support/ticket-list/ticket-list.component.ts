import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private httpTicketsService: HttpTicketsService,
    private ngxSpinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    // TODO: Implement resolver
    this.ngxSpinner.show('primary');
    this.httpTicketsService.getAllSupportTickets().subscribe({
      next: (value: Ticket[]) => {
        this.tickets = value;
      },
      error: (err) => {
        this.ngxSpinner.hide('primary');
      },
      complete: () => {
        this.ngxSpinner.hide('primary');
      }
    });

    
  }

}
