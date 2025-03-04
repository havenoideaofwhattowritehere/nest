import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResumeVersion } from './entities/resume_version.entity';
import { Repository } from 'typeorm';
import { ErrorMap } from '../../shared/common/utils/response/error.map';

export class ResumeVersionRepository {
  constructor(
    @InjectRepository(ResumeVersion)
    private readonly resumeVersionRepository: Repository<ResumeVersion>,
  ) {}

  async getResumeVersions(resume_id: string) {
    return await this.resumeVersionRepository.find({
      where: { resume: { id: resume_id } },
      order: { created_at: 'DESC' },
    });
  }

  async deleteVersion(version_id: string) {
    const version = await this.resumeVersionRepository.findOne({
      where: { id: version_id },
    });

    if (!version) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    await this.resumeVersionRepository.delete(version_id);
  }
}
