import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Product } from './models/product.entity';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CommonModule],
  controllers: [ProductController],
})
export class ProductModule {}
