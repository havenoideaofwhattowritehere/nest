import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeTechnology } from 'src/modules/employee_technologies/entities/employee_technology.entity';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  is_custom: boolean;

  @OneToMany(
    () => EmployeeTechnology,
    (employeeTechnology) => employeeTechnology.technology,
  )
  employeeTechnologies: EmployeeTechnology[];
}
