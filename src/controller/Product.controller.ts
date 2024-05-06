import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '../service/Product.service';
import {
  IProduct,
} from '../interface/Product.interface';

@Controller('api/products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post('')
  createProduct(@Body() body: IProduct): Promise<IProduct> {
    return this.service.createProduct(body);
  }

  @Get('')
  getAllProducts(): Promise<IProduct> {
    return this.service.getAllProducts();
  }

  @Put('/sku/:sku')
  alterProduct(
    @Param('sku') sku: number,
    @Body() body: IProduct,
  ): Promise<IProduct> {
    return this.service.alterProduct(sku, body);
  }

  @Delete('/sku/:sku')
  deleteProduct(@Param('sku') sku: number): Promise<IProduct> {
    return this.service.deleteProduct(sku);
  }
}
