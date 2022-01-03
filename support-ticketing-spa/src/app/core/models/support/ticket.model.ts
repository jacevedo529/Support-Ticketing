import { Priority, Status } from "./enums.model";
import { Post } from "./post.model";

export class Ticket {
    id: string | undefined;
    number: number | undefined;
    title: string | undefined;
    description: string | undefined;
    authorId: string | undefined;
    createdDate: Date | undefined;
    ownerId: string | undefined;
    status: Status | undefined;
    priority: Priority | undefined;
    posts: Post[] | undefined;
}