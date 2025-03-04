import { IsString } from 'class-validator';

export class UpdateEmployeeTechnologyDto {
  @IsString()
  id?: string;

  @IsString()
  employee_id: string;

  @IsString()
  technology_id: string;
}
