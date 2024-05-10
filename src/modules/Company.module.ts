import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModelName, CompanySchema } from '../schema/Company.schema';
import { CompanyController } from '../controller/Company.controller';
import { CompanyService } from '../service/Company.service';
import { CompanyRepository } from '../repository/Company.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyModelName, schema: CompanySchema },
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
