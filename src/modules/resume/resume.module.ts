import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { ResumeVersion } from 'src/modules/resume_version/entities/resume_version.entity';
import { ResumeRepository } from './resume.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Resume, ResumeVersion])],
  providers: [ResumeService, ResumeRepository],
  controllers: [ResumeController],
  exports: [ResumeService],
})
export class ResumeModule {}
