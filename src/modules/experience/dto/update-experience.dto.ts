import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateExperienceDto {
  @IsString()
  id?: string;

  @IsString()
  company_name: string;

  @IsString()
  position: string;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;

  @IsBoolean()
  currently_working: boolean;

  @IsString()
  description: string;

  @IsString()
  employee_id: string;
}
