import { Ticket } from "./ticket.model";

export class Post {
    id: string | undefined;
    text: string | undefined;
    authorId: string | undefined;
    createdDate: Date | undefined;
    ticket: Ticket | undefined;
}