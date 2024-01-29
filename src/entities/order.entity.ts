import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Product } from './product.entity';
import { Table } from './table.entity';
import {PaymentMethod } from "./paymentMethod.entity";

export enum OrderStatus {
  running = 0,
  paid = 1,
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: number;

  @Column()
  total_price: number;

  @Column()
  date_start: number;

  @Column()
  date_end: number;

  @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.orders)
  paymentMethod: PaymentMethod;

  @ManyToMany(() => Product, product => product.orders)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => Table, table => table.orders)
  table: Table;
    payment: any;

  constructor() {
    this.id = Date.now() + Math.floor(Math.random() * 10000);
    this.total_price = 0.0;
    this.date_start = Date.now();
  }

  public addProduct(product: Product, quantity: number) {
    if (!this.products) {
      this.products = [];
    }
    // find the product
    const index = this.products.findIndex((el) => {
      return el.id == product.id;
    });
    if (index >= 0) {
      // if the product is in the list, only increment the quantity
      this.products.at(index).quantity += quantity;
      // if no quantity anymore, remove the product from the list
      if (this.products.at(index).quantity <= 0) {
        this.products.splice(index, 1);
      }
    } else {
      // otherwise, add the product to the list
      this.products.push(product);
    }
    this.refresh();
  }

  public refresh() {
    // refresh the total price of each product
    // calculate the new price total
    let total = 0.0;
    this.products.forEach((el) => {
      el.refresh();
      total += el.total_price;
    });
    this.total_price = total;
  }

  public close() {
    this.status = OrderStatus.paid;
    this.date_end = Date.now();
  }

  public canClose(): boolean {
    return this.products && this.products.length > 0;
  }
}
