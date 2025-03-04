import { Employee } from "src/modules/employee/entities/employee.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Direction
{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Employee, (employee) => employee.direction)
    employees: Employee[];
}