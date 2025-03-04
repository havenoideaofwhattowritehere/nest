import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EmployeeTechnologyService } from './employee_technology.service';
import { CreateEmployeeTechnologyDto } from './dto/createEmployeeTechnologyDto';
import { UpdateEmployeeTechnologyDto } from './dto/updateEmployeeTechnologyDto';

@Controller('employee-technology')
export class EmployeeTechnologyController {
  constructor(
    private readonly employeeTechnologyService: EmployeeTechnologyService,
  ) {}

  @Post()
  async create(
    @Body() createEmployeeTechnologyDto: CreateEmployeeTechnologyDto,
  ) {
    return this.employeeTechnologyService.createEmployeeTechnology(
      createEmployeeTechnologyDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.employeeTechnologyService.getEmployeeTechnologies(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeTechnologyDto: UpdateEmployeeTechnologyDto,
  ) {
    return this.employeeTechnologyService.updateEmployeeTechnology(
      id,
      updateEmployeeTechnologyDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.employeeTechnologyService.removeEmployeeTechnology(id);
  }
}
