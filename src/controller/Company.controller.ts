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

  @Put('/id/:id')
  alterUserType(
    @Param('id') id: string,
    @Body() body: ICompany,
  ): Promise<IMessage> {
    return this.service.alterCompany(id, body);
  }

  @Delete('/id/:id')
  deleteUserType(@Param('id') id: string): Promise<IMessage> {
    return this.service.deleteCompany(id);
  }
}
