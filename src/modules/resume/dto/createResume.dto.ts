import { IsString } from 'class-validator';

export class CreateResumeDto {
  @IsString()
  employee_id: string;

  @IsString()
  file_path: string;
}
