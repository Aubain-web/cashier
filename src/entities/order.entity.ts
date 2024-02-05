import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Product } from './product.entity';
import { Table } from './table.entity';

export enum OrderStatus {
  running = 0,
  paid = 1,
}

@Entity({name : 'orders'})
export class Order {
  @PrimaryColumn({type: 'bigint'})
  id: number;

  @Column({ default: OrderStatus.running })
  status: number;

  @Column()
  total_price: number;

  @Column({ type: 'datetime' })
  date_start: Date;

  @Column({ type: 'datetime'})
  date_end: Date;

 
  @ManyToMany(() => Product, product => product.orders)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => Table, table => table.orders, {eager: true})
  table: Table;
    payment: any;
  quantity: any;

  constructor() {
    this.id = Date.now() + Math.floor(Math.random() * 10000);
    this.total_price = 0.0;
    this.date_start =  new Date();
    this.date_end = new Date();
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
      console.log("my product is added successfully")
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
      console.log(`my product with id : ${el.id} totl price is ${el.total_price}`)
      total += el.total_price;
    });
    console.log('my order total price is', total);
    this.total_price = total;
  }

  public close() {
    this.status = OrderStatus.paid;
  this.date_end = new Date();
  }

  public canClose(): boolean {
    console.log("my order products length is ", this.products.length)
    return this.products && this.products.length > 0;
  }
}
