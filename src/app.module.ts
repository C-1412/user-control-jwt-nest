import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TipoProductosModule } from './tipo-productos/tipo-productos.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'tienda_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    UsersModule,
    AuthModule,
    TipoProductosModule,
    ProductosModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
