import { IsNotEmpty } from "class-validator";

export abstract class pageDto {
    @IsNotEmpty()
    size = 20;

    @IsNotEmpty()
    page = 1;
}
