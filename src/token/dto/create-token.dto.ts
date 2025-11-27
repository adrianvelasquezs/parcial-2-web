import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateTokenDto {
    @IsString()
    token: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;

    @IsNumber()
    @IsOptional()
    reqLeft?: number;
}

