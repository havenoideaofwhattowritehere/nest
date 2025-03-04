import { Employee } from 'src/modules/employee/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company_name: string;

  @Column()
  position: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  currently_working: boolean;

  @Column()
  description: string;

  @ManyToOne(() => Employee, (employee) => employee.experiences)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
