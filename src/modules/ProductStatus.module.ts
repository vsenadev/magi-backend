import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductStatusController } from '../controller/ProductStatus.controller';
import { ProductStatusModelName, ProductStatusSchema } from '../schema/ProductStatus.schema';
import { ProductStatusRepository } from 'src/repository/ProductStatus.repository';
import { ProductStatusService } from 'src/service/ProductStatus.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductStatusModelName, schema: ProductStatusSchema },
    ]),
  ],
  controllers: [ProductStatusController],
  providers: [ProductStatusService, ProductStatusRepository],
})
export class ProductStatusModule {}
