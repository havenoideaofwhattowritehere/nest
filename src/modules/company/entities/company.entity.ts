import { Employee } from "src/modules/employee/entities/employee.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Employee, (employee) => employee.company)
    employees: Employee[];

    @OneToMany(() => User, (user) => user.company)
    users: User[];
}