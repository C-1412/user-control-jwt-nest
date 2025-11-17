import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { TipoProducto } from '../tipo-productos/entities/tipo-producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, TipoProducto])],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}