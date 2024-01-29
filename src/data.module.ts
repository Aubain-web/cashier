import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Table } from './entities/table.entity';
import { ProductCategory } from './entities/category.entity';
import { TableSchema } from './entities/tableSchema.entity';
import { PaymentMethod } from './entities/paymentMethod.entity';

@Module({
  imports: [
    DataModule, 
     TypeOrmModule.forFeature([Product, Order, Table, ProductCategory, TableSchema, PaymentMethod])
  ],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
