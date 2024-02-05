import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
}