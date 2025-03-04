import { Resume } from 'src/modules/resume/entities/resume.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ResumeVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  version_type: string;

  @Column()
  file_path: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Resume, (resume) => resume.resumeVersions)
  @JoinColumn({ name: 'resume_id' })
  resume: Resume;
}
