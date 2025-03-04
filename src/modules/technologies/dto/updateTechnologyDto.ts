import { IsBoolean, IsString } from 'class-validator';

export class UpdateTechnologyDto {
  @IsString()
  id?: string;

  @IsString()
  name: string;

  @IsBoolean()
  isCustom: boolean;
}
