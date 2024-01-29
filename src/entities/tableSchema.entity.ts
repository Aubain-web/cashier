import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Table } from "./table.entity";




@Entity()
export class TableSchema {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @OneToMany(()=>Table, table=>table.tableSchema)
    tables : Table[];

    
}