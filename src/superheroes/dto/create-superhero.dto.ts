import { IsNumber, IsString } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  name: string;

  @IsString()
  superPower: string;

  @IsNumber()
  humilityScore: number;
}
