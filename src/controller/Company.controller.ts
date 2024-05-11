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
  ICompany,
  ICompanyWithStatusCode,
} from '../interface/Company.interface';
import { CompanyService } from '../service/Company.service';

@Controller('api/company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Post('')
  createUserType(@Body() body: ICompany): Promise<IMessage> {
    return this.service.createCompany(body);
  }

  @Get('')
  getAllUserType(): Promise<ICompanyWithStatusCode> {
    return this.service.getAllCompanies();
  }

  @Put('/id/:_id')
  alterUserType(
    @Param('_id') _id: string,
    @Body() body: ICompany,
  ): Promise<IMessage> {
    return this.service.alterCompany(_id, body);
  }

  @Delete('/id/:id')
  deleteUserType(@Param('_id') _id: string): Promise<IMessage> {
    return this.service.deleteCompany(_id);
  }
}
