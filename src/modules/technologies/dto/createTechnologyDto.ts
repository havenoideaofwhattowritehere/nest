import { IsBoolean, IsString } from 'class-validator';
export class CreateTechnologyDto {
  @IsString()
  name: string;

  @IsBoolean()
  isCustom: boolean;
}
