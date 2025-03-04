import { IsString } from "class-validator";

export class UpdateCompanyDto {
    @IsString()
    id: string;

    @IsString()
    name: string;
}