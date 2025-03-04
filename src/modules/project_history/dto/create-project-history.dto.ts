import { IsDate, IsString } from 'class-validator';

export class CreateProjectHistoryDto {
  @IsString()
  project_name: string;

  @IsString()
  role: string;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;

  @IsString()
  description: string;

  @IsString()
  employee_id: string;
}
