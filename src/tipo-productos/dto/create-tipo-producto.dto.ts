import { IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTipoProductoDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  descripcion: string;
}