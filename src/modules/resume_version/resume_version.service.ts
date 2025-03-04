import { Injectable } from '@nestjs/common';
import { ResumeVersionRepository } from './resume_version.repository';

@Injectable()
export class ResumeVersionService {
  constructor(
    private readonly resumeVersionRepository: ResumeVersionRepository,
  ) {}

  async getResumeVersions(resume_id: string) {
    return this.resumeVersionRepository.getResumeVersions(resume_id);
  }

  async deleteVersion(version_id: string) {
    return this.resumeVersionRepository.deleteVersion(version_id);
  }
}
