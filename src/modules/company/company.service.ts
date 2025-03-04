import { Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async createCompany(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.createCompany(createCompanyDto);
  }

  async getCompanies(): Promise<Company[]> {
    return this.companyRepository.getCompanies();
  }

  async getCompanyById(company_id: string) {
    return this.companyRepository.getCompanyById(company_id);
  }

  async getCompanyByName(company_name: string) {
    return this.companyRepository.getCompanyByName(company_name);
  }

  async getCompanyEmployees(company_name: string) {
    return this.companyRepository.getCompanyEmployees(company_name);
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.updateCompany(id, updateCompanyDto);
  }

  async removeCompany(company_name: string) {
    return this.companyRepository.removeCompany(company_name);
  }
}
