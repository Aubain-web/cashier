import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from './order.entity';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @OneToMany(() => Order, order => order.paymentMethod)
  orders: Order[];
}
