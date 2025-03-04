import { Injectable } from '@nestjs/common';
import { Resume } from './entities/resume.entity';
import { CreateResumeDto } from './dto/createResume.dto';
import { UpdateResumeDto } from './dto/updateResume.dto';
import { ResumeVersion } from 'src/modules/resume_version/entities/resume_version.entity';
import { CreateResumeVersionDto } from 'src/modules/resume_version/dto/createResumeVersion.dto';
import { ResumeRepository } from './resume.repository';

@Injectable()
export class ResumeService {
  constructor(private readonly resumeRepository: ResumeRepository) {}

  async createResume(dto: CreateResumeDto): Promise<Resume> {
    return this.resumeRepository.createResume(dto);
  }

  async updateResume(resume_id: string, dto: UpdateResumeDto): Promise<Resume> {
    return this.resumeRepository.updateResume(resume_id, dto);
  }

  async createResumeVersion(
    dto: CreateResumeVersionDto,
  ): Promise<ResumeVersion> {
    return this.resumeRepository.createResumeVersion(dto);
  }

  async getResumeWithVersions(resume_id: string): Promise<Resume | null> {
    return this.resumeRepository.getResumeWithVersions(resume_id);
  }

  async revertToVersion(
    resume_id: string,
    version_id: string,
  ): Promise<Resume> {
    return this.resumeRepository.revertToVersion(resume_id, version_id);
  }
}
