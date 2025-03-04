import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDirectionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
