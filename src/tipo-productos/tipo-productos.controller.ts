import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { CreateTipoProductoDto } from './dto/create-tipo-producto.dto';
import { UpdateTipoProductoDto } from './dto/update-tipo-producto.dto';
import { TipoProductosService } from './tipo-productos.service';

@Controller('tipo-productos')
export class TipoProductosController {
  constructor(private readonly tipoProductosService: TipoProductosService) {}

  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createTipoProductoDto: CreateTipoProductoDto) {
    return this.tipoProductosService.create(createTipoProductoDto);
  }

  @Get()
  @Auth(Role.USER)
  findAll() {
    return this.tipoProductosService.findAll();
  }

  @Get(':id')
  @Auth(Role.USER)
  findOne(@Param('id') id: string) {
    return this.tipoProductosService.findOne(+id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateTipoProductoDto: UpdateTipoProductoDto) {
    return this.tipoProductosService.update(+id, updateTipoProductoDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.tipoProductosService.remove(+id);
  }
}