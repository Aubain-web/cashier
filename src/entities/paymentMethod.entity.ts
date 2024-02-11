import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";



@Entity()
export class PaymentMethod{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

   @OneToMany(() => Order, order => order.paymentMethod)
   orders : Order[]
   


    constructor(name: string) {
        this.name = name;
    }



}