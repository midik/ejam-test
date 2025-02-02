import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  name: string;

  @IsString()
  superPower: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  humilityScore: number;
}
