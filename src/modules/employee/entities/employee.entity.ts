import { Company } from 'src/modules/company/entities/company.entity';
import { Direction } from 'src/modules/direction/entities/direction.entity';
import { Experience } from 'src/modules/experience/entities/experience.entity';
import { ProjectHistory } from 'src/modules/project_history/entities/project-history.entity';
import { EmployeeTechnology } from 'src/modules/employee_technologies/entities/employee_technology.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resume } from 'src/modules/resume/entities/resume.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  birth: Date;

  @Column()
  hire_date: Date;

  @Column()
  direction_id: number;

  @ManyToOne(() => Company, (company) => company.employees)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => Experience, (experience) => experience.employee)
  experiences: Experience[];

  @OneToMany(() => ProjectHistory, (project) => project.employee)
  projects: ProjectHistory[];

  @ManyToOne(() => Direction, (direction) => direction.employees)
  @JoinColumn({ name: 'direction_id' })
  direction: Direction;

  @OneToMany(
    () => EmployeeTechnology,
    (employee_technology) => employee_technology.employee,
  )
  employeeTechnologies: EmployeeTechnology[];

  @OneToMany(() => Resume, (resume) => resume.employee)
  resumes: Resume[];
}
