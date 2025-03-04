import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Technology } from 'src/modules/technologies/entities/technologies.entity';

@Entity()
export class EmployeeTechnology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, (employee) => employee.employeeTechnologies)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @ManyToOne(() => Technology, (technology) => technology.employeeTechnologies)
  @JoinColumn({ name: 'technology_id' })
  technology: Technology;
}
