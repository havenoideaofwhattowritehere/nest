import { Employee } from 'src/modules/employee/entities/employee.entity';
import { ResumeVersion } from 'src/modules/resume_version/entities/resume_version.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  file_path: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Employee, (employee) => employee.resumes)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @OneToMany(() => ResumeVersion, (resumeVersion) => resumeVersion.resume)
  resumeVersions: ResumeVersion;
}
