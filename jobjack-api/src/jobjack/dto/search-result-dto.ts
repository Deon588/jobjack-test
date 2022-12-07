import { IsNotEmpty } from "class-validator";
import { pageDto } from "./page.dto";

export class PaginatedSearchResultDto<T> extends pageDto {
    total: number;

    @IsNotEmpty()
    term: string;

    results: T[] = [];

    constructor() {
        super();
    }
}
