import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from '../controller/Product.controller';
import { ProductService } from '../service/Product.service';
import { ProductSchema, ProductModelName } from '../schema/Product.schema';
import { ProductRepository } from '../repository/Product.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModelName, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
