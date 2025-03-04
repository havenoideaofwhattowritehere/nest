import { Employee } from 'src/modules/employee/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProjectHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  project_name: string;

  @Column()
  role: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  description: string;

  @ManyToOne(() => Employee, (employee) => employee.projects)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
