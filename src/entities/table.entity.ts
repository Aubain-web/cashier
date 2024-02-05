import { Product } from './product.entity';
import { Order, OrderStatus } from './order.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export enum TypeTable {
  square_2 = 'square_dining_table_2',
  square_4 = 'square_dining_table_4',
  rectangle_6 = 'rectangle_dining_table_6',
  rectangle_8 = 'rectangle_dining_table_8',
  round_4 = 'round_dining_table_4',
}
export interface PositionSchemaInterface {
  posX: number;
  posY: number;
}

@Entity({name: 'tables'})
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  posX: number;

  @Column()
  posY: number;

  position: PositionSchemaInterface;
 
  

  @OneToMany(() => Order, order => order.table)
  orders: Order[];

  order: Order = null;
    //tableSchema: any;

  constructor(
    id: number = null,
    type: TypeTable = TypeTable.square_2,
    x = 0,
    y = 0,
  ) {
    this.id = id;
    this.type = type;
    this.posX = x;
    this.posY = y;
  }

  getCurrentOrder(): Order {
    if (this.order == null)
      this.order = this.orders?.find((el) => el.status == OrderStatus.running);
    return this.order;
  }

  public addProductOrder(product: Product, quantity: number) {
    if (this.order == null){
      console.log("current order is null");
       this.order = new Order();
    }
    this.getCurrentOrder().table = this;
    // we clone the object to prevent any change of the product parameter pass by referencee
    const product_clone = Object.assign(new Product(), product);
    this.getCurrentOrder()?.addProduct(product_clone, quantity);
  }

  public close() {
    this.order = null;
  }
}
