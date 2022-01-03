import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketComponent } from "./ticket/ticket.component";

const routes: Routes = [
    { path: '', component: TicketListComponent },
    { path: ':id', component: TicketComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SupportRoutingModule { }