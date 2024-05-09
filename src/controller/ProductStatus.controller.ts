import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { IMessage } from '../interface/Message.interface';
  import {
    IProductStatus,
    IProductStatusWithStatusCode,
  } from '../interface/ProductStatus.interface';
import { ProductStatusService } from '../service/ProductStatus.service';
  
  @Controller('api/productstatus')
  export class ProductStatusController {
    constructor(private readonly service: ProductStatusService) {}
  
    @Post('')
    createProductStatus(@Body() body: IProductStatus): Promise<IMessage> {
      return this.service.createProductStatus(body);
    }
  
    @Get('')
    getAllProductStatus(): Promise<IProductStatusWithStatusCode> {
      return this.service.getAllProductStatus();
    }
  
    @Put('/code/:code')
    alterProductStatus(
      @Param('code') code: number,
      @Body() body: IProductStatus,
    ): Promise<IMessage> {
      return this.service.alterProductStatus(code, body);
    }
  
    @Delete('/code/:code')
    deleteProductStatus(@Param('code') code: number): Promise<IMessage> {
      return this.service.deleteProductStatus(code);
    }
  }
  