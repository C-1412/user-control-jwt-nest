import { Transform } from 'class-transformer';
import { IsString, MinLength, IsNumber, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateProductoDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  descripcion: string;

  @IsNumber()
  @IsOptional()
  precio?: number;

  @IsBoolean()
  @IsOptional()
  enExposicion?: boolean;

  @IsString()
  @IsOptional()
  imagenUrl?: string;

  @IsNotEmpty()
  @IsNumber()
  tipoProductoId: number;
}