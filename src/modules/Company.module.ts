import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModelName, CompanySchema } from '../schema/Company.schema';
import { CompanyController } from '../controller/Company.controller';
import { CompanyService } from '../service/Company.service';
import { CompanyRepository } from '../repository/Company.repository';
import { Cryptography } from '../utils/Cryptography.utils';
import { RandomCode } from '../utils/RandomCode.utils';
import { Email } from '../utils/Email.utils';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyModelName, schema: CompanySchema },
    ]),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyRepository,
    Cryptography,
    RandomCode,
    Email,
  ],
})
export class CompanyModule {}
