import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in dev
      ssl: {
        rejectUnauthorized: false, // Required for Neon
      },
      logging: process.env.NODE_ENV === 'development',
    }),
    ProductsModule,
  ],
})
export class AppModule {}
