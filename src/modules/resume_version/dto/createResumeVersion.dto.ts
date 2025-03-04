import { IsString } from 'class-validator';

export class CreateResumeVersionDto {
  @IsString()
  resume_id: string;

  @IsString()
  file_path: string;

  @IsString()
  version_type: string;
}
