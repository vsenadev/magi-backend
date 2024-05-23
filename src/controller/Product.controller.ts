import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from '../service/Product.service';
import {
  IProduct,
  IProductWithStatusCode,
} from '../interface/Product.interface';
import { IMessage } from 'src/interface/Message.interface';

@Controller('api/products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post('')
  createProduct(@Body() body: IProduct): Promise<IMessage> {
    return this.service.createProduct(body);
  }

  @Get('')
  getAllProducts(): Promise<IProductWithStatusCode> {
    return this.service.getAllProducts();
  }

  @Put('/sku/:sku')
  alterProduct(
    @Param('sku') sku: string,
    @Body() body: IProduct,
  ): Promise<IMessage> {
    return this.service.alterProduct(sku, body);
  }

  @Delete('/sku/:sku')
  deleteProduct(@Param('sku') sku: string): Promise<IMessage> {
    return this.service.deleteProduct(sku);
  }
}
