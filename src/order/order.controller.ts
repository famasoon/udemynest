import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { OrderService } from './order.service';

@UseGuards(AuthGuard)
@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get('orders')
  async all(@Query('page') page = 1) {
    return this.orderService.pagenate(page, ['order_items']);
  }
}
