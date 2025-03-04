import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ErrorMap } from '../../shared/common/utils/response/error.map';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const duplicate = await this.getCompanyByName(createCompanyDto.name);
    if (duplicate) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }
    const company = this.companyRepository.create(createCompanyDto);
    if (!company) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    return await this.companyRepository.save(company);
  }

  async getCompanies(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async getCompanyById(company_id: string) {
    return await this.companyRepository.findOne({ where: { id: company_id } });
  }

  async getCompanyByName(company_name: string) {
    return await this.companyRepository.findOne({
      where: { name: company_name },
    });
  }

  async getCompanyEmployees(company_name: string) {
    return await this.companyRepository.find({
      where: { name: company_name },
      select: ['employees'],
    });
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
    const updatedCompany = await this.companyRepository.update(
      id,
      updateCompanyDto,
    );
    if (!updatedCompany) {
      throw new BadRequestException(ErrorMap.UNKNOWN_ERROR);
    }
    return await this.companyRepository.findOne({ where: { id: id } });
  }

  async removeCompany(company_name: string) {
    const isDeleted = await this.companyRepository.delete({
      name: company_name,
    });
    if (!isDeleted.affected) throw new BadRequestException();
    return true;
  }
}
