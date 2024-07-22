import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IMessage } from '../interface/Message.interface';
import {
  ICompany,
  ICompanyWithStatusCode,
  IPassword,
} from '../interface/Company.interface';
import { CompanyService } from '../service/Company.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Post('')
  createCompany(@Body() body: ICompany): Promise<IMessage> {
    return this.service.createCompany(body);
  }

  @Get('')
  getAllCompanies(): Promise<ICompanyWithStatusCode> {
    return this.service.getAllCompanies();
  }

  @Put('/id/:_id')
  alterCompany(
    @Param('_id') _id: string,
    @Body() body: ICompany,
  ): Promise<IMessage> {
    return this.service.alterCompany(_id, body);
  }

  @Put('/password/:_id')
  alterPassword(
    @Param('_id') _id: string,
    @Body() body: IPassword,
  ): Promise<IMessage> {
    return this.service.alterPassword(_id, body.password);
  }

  @Put('/code/:_id')
  validateCode(
    @Param('_id') _id: string,
    @Body() body: IPassword,
  ): Promise<boolean | IMessage> {
    return this.service.validateCode(_id, body.password);
  }
  @Put('/picture/:_id')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Param('_id') _id: string,
  ) {
    return this.service.uploadImage(_id, image);
  }

  @Delete('/id/:id')
  deleteCompany(@Param('_id') _id: string): Promise<IMessage> {
    return this.service.deleteCompany(_id);
  }
}
