import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';
import { ProductService } from './product.service';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  async all(@Query('page') page = 1) {
    return this.productService.pagenate(page);
  }

  @Post()
  async create(@Body() body: ProductCreateDto) {
    return this.productService.create(body);
  }

  @Get('id')
  async get(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Put('id')
  async update(@Param('id') id: number, @Body() body: ProductUpdateDto) {
    await this.productService.update(id, body);
    return this.productService.findOne({ id });
  }

  @Delete('id')
  async delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
