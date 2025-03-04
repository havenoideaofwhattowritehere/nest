import { IsString } from 'class-validator';

export class CreateEmployeeTechnologyDto {
  @IsString()
  employee_id: string;

  @IsString()
  technology_id: string;
}
