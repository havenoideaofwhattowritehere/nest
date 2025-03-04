import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeVersion } from './entities/resume_version.entity';
import { ResumeVersionService } from './resume_version.service';
import { ResumeVersionController } from './resume_version.controller';
import { ResumeVersionRepository } from './resume_version.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ResumeVersion])],
  exports: [ResumeVersionService],
  providers: [ResumeVersionService, ResumeVersionRepository],
  controllers: [ResumeVersionController],
})
export class ResumeVersionModule {}
