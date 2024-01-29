import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, product => product.productCategory)
  products: Product[];
  /*static starters: number;
  static dishes: number;
  static deserts: number;
  static drinks: number;
  static alcools: number;*/
}