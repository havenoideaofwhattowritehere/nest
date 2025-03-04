import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  id?: string;

  @IsString()
  firstName: string;

  @IsString()
  secondName: string;

  @IsString()
  phone: string;

  @IsEmail()
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
