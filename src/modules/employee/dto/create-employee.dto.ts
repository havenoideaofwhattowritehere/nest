import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  firstName: string;

  @IsString()
  secondName: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsDate()
  birth: Date;

  @IsDate()
  hire_date: Date;

  @IsNumber()
  direction_id: number;

  @IsString()
  company_id: string;
}
