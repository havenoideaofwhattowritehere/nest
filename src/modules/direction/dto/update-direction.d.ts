import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDirectionDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}
