import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HandlebarMiddleware } from './middlewares/handlebar.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablePanelModule } from './tablePanel/tablePanel.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PlanModule } from './plan/plan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Table } from './entities/table.entity';
import { Order } from './entities/order.entity';
import { ProductCategory } from './entities/category.entity';
import { TableSchema } from './entities/tableSchema.entity';
import { PaymentMethod } from './entities/paymentMethod.entity';
@Module({
  imports: [
     TypeOrmModule.forRoot({
       type: 'mysql',
       host: 'localhost',
       port: 3306,
       username: 'root',
       password: 'root',
       database: 'cashier',
       entities: [Product, Table, Order, ProductCategory, TableSchema, PaymentMethod],
       synchronize: true,
     }),
    TablePanelModule,
    PlanModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HandlebarMiddleware).forRoutes('/');
    consumer.apply(HandlebarMiddleware).forRoutes('plan');
    consumer.apply(HandlebarMiddleware).forRoutes('invoices');
    consumer.apply(HandlebarMiddleware).forRoutes('tables');
    consumer.apply(HandlebarMiddleware).forRoutes('tables(/.*)');
    consumer.apply(HandlebarMiddleware).forRoutes('invoices(/.*)');
  }
}
