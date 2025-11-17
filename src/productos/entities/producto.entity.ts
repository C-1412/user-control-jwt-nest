import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TipoProducto } from '../../tipo-productos/entities/tipo-producto.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  precio: number;

  @Column({ default: true })
  enExposicion: boolean;

  @Column({ nullable: true })
  imagenUrl: string;

  @ManyToOne(() => TipoProducto, (tipoProducto) => tipoProducto.id, { nullable: false })
  tipoProducto: TipoProducto;

  @DeleteDateColumn()
  deletedAt: Date;
}