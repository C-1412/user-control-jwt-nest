import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoProductoDto } from './dto/create-tipo-producto.dto';
import { UpdateTipoProductoDto } from './dto/update-tipo-producto.dto';
import { TipoProducto } from './entities/tipo-producto.entity';

@Injectable()
export class TipoProductosService {
  constructor(
    @InjectRepository(TipoProducto)
    private readonly tipoProductoRepository: Repository<TipoProducto>,
  ) {}

  create(createTipoProductoDto: CreateTipoProductoDto) {
    return this.tipoProductoRepository.save(createTipoProductoDto);
  }

  findAll() {
    return this.tipoProductoRepository.find();
  }

  async findOne(id: number): Promise<TipoProducto> {
    const tipoProducto = await this.tipoProductoRepository.findOneBy({ id });
    if (!tipoProducto) {
      throw new NotFoundException(`TipoProducto con id ${id} no encontrado`);
    }
    return tipoProducto;
  }

  async update(id: number, updateTipoProductoDto: UpdateTipoProductoDto): Promise<TipoProducto> {
    const tipoProducto = await this.findOne(id);
    const updatedTipoProducto = Object.assign(tipoProducto, updateTipoProductoDto);
    return this.tipoProductoRepository.save(updatedTipoProducto);
  }

  async remove(id: number): Promise<void> {
    const tipoProducto = await this.findOne(id);
    await this.tipoProductoRepository.softRemove(tipoProducto);
  }
}