import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";


export enum Category {
  drinks = 1,
  alcools = 2,
  starters = 3,
  dishes = 4,
  deserts = 5,
}
@Entity({name : "products"})
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  pic: string;

  @Column()
  category: number;
 

  quantity = 1;
  total_price = 0.0;
  orders: Order[];

  constructor(name = '', price = 0, pic = '', category = 1) {
   // this.id = Date.now() + Math.floor(Math.random() * 10000);
    this.name = name;
    this.price = price;
    this.pic = pic;
    this.category = category;
  }

  public refresh() {
    this.total_price = this.quantity * this.price;
  }
}
//export { Category };

