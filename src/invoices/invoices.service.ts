import { Injectable } from '@nestjs/common';
import { DataService } from '../data.service';
import { Order } from 'src/entities/order.entity';

@Injectable()
export class InvoicesService {
  constructor(private service: DataService) {}

  async getOrders(): Promise<Order[]> {
    const orders = await this.service.findAllClosedOrders();
    console.log("my orders are: ",orders)
    return orders;
  }

  async getOrder(id: number): Promise<Order> {
    return this.service.findOneOrder(id);
  }
}
