import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProducto } from './entities/tipo-producto.entity';
import { TipoProductosController } from './tipo-productos.controller';
import { TipoProductosService } from './tipo-productos.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoProducto])],
  controllers: [TipoProductosController],
  providers: [TipoProductosService],
})
export class TipoProductosModule {}