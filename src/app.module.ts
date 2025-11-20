import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TipoProductosModule } from './tipo-productos/tipo-productos.module';
import { ProductosModule } from './productos/productos.module';
import { CommentsModule } from './comments/comments.module';
import { AppDataSource } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
    }),
    
    UsersModule,
    AuthModule,
    TipoProductosModule,
    ProductosModule,
    CommentsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
