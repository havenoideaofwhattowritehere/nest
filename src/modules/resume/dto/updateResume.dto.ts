import { IsString } from 'class-validator';

export class UpdateResumeDto {
  @IsString()
  file_path: string;
}
