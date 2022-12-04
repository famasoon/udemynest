import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PagenatedResult } from 'src/common/pagenated-result.interface';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService extends AbstractService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }

  async pagenate(page = 1, relations = []): Promise<PagenatedResult> {
    const { data, meta } = await super.pagenate(page, relations);

    return {
      data: data.map((order: Order) => ({
        id: order.id,
        name: order.name,
        email: order.email,
        total: order.total,
        creted_at: order.created_at,
        order_items: order.order_items,
      })),
      meta: meta,
    };
  }

  async chart() {
    return this.orderRepository.query(`
      SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, sum(i.price * i.quantinty) as sum
      FROM orders o
      JOIN order_items i on o.id = i.order_id
      GROUP BY date;
    `);
  }
}
