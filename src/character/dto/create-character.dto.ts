import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  name: string;

  @IsNumber()
  salary: number;

  @IsBoolean()
  employee: boolean;

  @IsOptional()
  @IsNumber()
  property?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  favPlaces?: number[];
}
