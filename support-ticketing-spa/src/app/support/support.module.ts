import { NgModule } from '@angular/core';
import { SupportRoutingModule } from './support-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  declarations: [
    TicketListComponent,
    TicketComponent
  ],
  imports: [
    SharedModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
