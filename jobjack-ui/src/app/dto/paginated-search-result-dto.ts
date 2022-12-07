import { pageDto } from "./page.dto";

export class PaginatedSearchResultDto<T> extends pageDto  {
    total: number;
    term: string;
    results: T[] = [];

    constructor() {
        super();
    }
}
