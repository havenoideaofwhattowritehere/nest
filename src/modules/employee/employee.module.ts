import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeRepository } from './employee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeService, EmployeeRepository],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
