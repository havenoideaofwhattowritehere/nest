import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompanyService, CompanyRepository],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
