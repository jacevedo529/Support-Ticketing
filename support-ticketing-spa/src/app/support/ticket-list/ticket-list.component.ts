import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgxSpinnerService } from 'ngx-spinner';
import { SortByOption } from 'src/app/core/enums/Support/sort-by-options.enum';
import { HttpTicketsService } from 'src/app/core/http/support/http-tickets.service';
import { Status } from 'src/app/core/models/support/enums.model';
import { Ticket } from 'src/app/core/models/support/ticket.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  // Data
  public tickets: Ticket[] | undefined;

  // Template Props
  public templateTickets: Ticket[] | undefined;
  public selectedSortOption: string = SortByOption.LastUpdatedDate;
  public sortByOptions: string[] = [SortByOption.CreatedDate, SortByOption.LastUpdatedDate];
  public statusOptions: string[] = [Status.New, Status.Open, Status.Closed];
  public checkedStatusOptions: string[] = [];

  // Enums
  public Status = Status;

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

        this.initTemplate();
      },
      error: (err) => {
        this.ngxSpinner.hide('primary');
      },
      complete: () => {
        this.ngxSpinner.hide('primary');
      }
    });
  }

  public onStatusChange(eventArgs: MatCheckboxChange) {
    const isChecked = eventArgs.checked,
      status = eventArgs.source.id;

    if (isChecked) {
      this.checkedStatusOptions.push(status);
    } else {
      const statusIndex = this.checkedStatusOptions.findIndex(x => x === status);
      if (statusIndex !== -1) {
        this.checkedStatusOptions.splice(statusIndex, 1);
      }
    }
  }

  private initTemplate() {
    debugger;
    this.filterTickets();
    this.sortTickets();
  }

  private sortTickets() {
    if (this.selectedSortOption === SortByOption.LastUpdatedDate) {
      this.templateTickets?.sortDescendingByKey(x => x.createdDate);
    } else {
      this.templateTickets?.sortDescendingByKey(x => x.lastUpdatedDate);
    }
  }

  private filterTickets() {
    let tickets = this.tickets;
    this.checkedStatusOptions.forEach(value => {
      tickets?.filter(x => x.status === value);
    });

    this.templateTickets = tickets;
  }
}
