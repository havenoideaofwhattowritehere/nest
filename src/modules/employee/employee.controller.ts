import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Get(':employee_id')
  async getEmployee(@Param('employee_id') employee_id: string) {
    return this.employeeService.getEmployee(employee_id);
  }

  @Put(':employee_id')
  async updateEmployee(
    @Param('employee_id') employee_id: string,
    @Body() updateEmployeeDto: Partial<UpdateEmployeeDto>,
  ) {
    return this.employeeService.updateEmployee(employee_id, updateEmployeeDto);
  }

  @Delete(':employee_id')
  @HttpCode(HttpStatus.OK)
  async removeEmployee(@Param('employee_id') employee_id: string) {
    return this.employeeService.removeEmployee(employee_id);
  }
}
