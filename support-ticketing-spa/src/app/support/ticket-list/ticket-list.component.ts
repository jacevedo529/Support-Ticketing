import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Data, Data } from '@angular/router';
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
  public selectedStatusOption: string = Status.New;

  // Enums
  public Status = Status;

  constructor(
    //private httpTicketsService: HttpTicketsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (value: Data) => {
        this.tickets = value['supportTickets'];
        this.initTemplate();
      },
      error: () => { },
      complete: () => { }
    })
  }

  // Maintain the checked status and exec filterTickets()
  // public onStatusChange(eventArgs: MatCheckboxChange) {
  //   const isChecked = eventArgs.checked,
  //     status = eventArgs.source.id;

  //   if (isChecked) {
  //     this.checkedStatusOptions.push(status);
  //   } else {
  //     const statusIndex = this.checkedStatusOptions.findIndex(x => x === status);
  //     if (statusIndex !== -1) {
  //       this.checkedStatusOptions.splice(statusIndex, 1);
  //     }
  //   }

  //   this.filterTickets();
  // }

  // Template function used to set the checked status
  // public isCheckedStatus(status: string) {
  //   return this.checkedStatusOptions.some(x => x === status);
  // }

  public onStatusSelectionChanged(event: MatRadioChange) {
    this.selectedStatusOption = event.value;
    this.filterTickets();
  }

  private initTemplate() {
    this.filterTickets();
    this.sortTickets();
  }

  private filterTickets() {
    const filteredTickets = this.tickets?.filter(x => x.status === this.selectedStatusOption);
    this.templateTickets = filteredTickets;
  }

  private sortTickets() {
    if (this.selectedSortOption === SortByOption.LastUpdatedDate) {
      this.templateTickets?.sortDescendingByKey(x => x.createdDate);
    } else {
      this.templateTickets?.sortDescendingByKey(x => x.lastUpdatedDate);
    }
  }
}
