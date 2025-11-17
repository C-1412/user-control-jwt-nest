import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { TipoProducto } from '../tipo-productos/entities/tipo-producto.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(TipoProducto)
    private readonly tipoProductoRepository: Repository<TipoProducto>,
  ) {}

  async create(createProductoDto: CreateProductoDto) {
    const tipoProducto = await this.tipoProductoRepository.findOneBy({ 
      id: createProductoDto.tipoProductoId 
    });
    
    if (!tipoProducto) {
      throw new NotFoundException(`TipoProducto con id ${createProductoDto.tipoProductoId} no encontrado`);
    }

    const producto = this.productoRepository.create({
      ...createProductoDto,
      tipoProducto,
    });

    return this.productoRepository.save(producto);
  }

  findAll() {
    return this.productoRepository.find({ 
      relations: ['tipoProducto'] 
    });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['tipoProducto'],
    });
    
    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);

    if (updateProductoDto.tipoProductoId) {
      const tipoProducto = await this.tipoProductoRepository.findOneBy({ 
        id: updateProductoDto.tipoProductoId 
      });
      
      if (!tipoProducto) {
        throw new NotFoundException(`TipoProducto con id ${updateProductoDto.tipoProductoId} no encontrado`);
      }
      producto.tipoProducto = tipoProducto;
    }

    const updatedProducto = Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(updatedProducto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.softRemove(producto);
  }
}