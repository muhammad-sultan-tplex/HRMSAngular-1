import { UserDto } from "../models/user-model";

export class PagedResultDto{
    totalCount?: number;
    items: UserDto[] = [];
    pageNumber?: number;
    pageSize?: number;
    sort?: number;
}
