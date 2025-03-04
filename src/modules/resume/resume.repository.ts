import { CreateResumeDto } from './dto/createResume.dto';
import { UpdateResumeDto } from './dto/updateResume.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateResumeVersionDto } from '../resume_version/dto/createResumeVersion.dto';
import path from 'path';
import fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { Repository } from 'typeorm';
import { ResumeVersion } from '../resume_version/entities/resume_version.entity';
import { ErrorMap } from '../../shared/common/utils/response/error.map';

export class ResumeRepository {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    @InjectRepository(ResumeVersion)
    private readonly resumeVersionRepository: Repository<ResumeVersion>,
  ) {}

  async createResume(dto: CreateResumeDto) {
    const resume = this.resumeRepository.create(dto);
    return await this.resumeRepository.save(resume);
  }

  async updateResume(resume_id: string, dto: UpdateResumeDto) {
    const resume = await this.resumeRepository.findOne({
      where: { id: resume_id },
    });
    if (!resume) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    const newVersion = this.resumeVersionRepository.create({
      resume,
      file_path: resume.file_path,
      version_type: 'UPDATED',
    });
    await this.resumeVersionRepository.save(newVersion);

    resume.file_path = dto.file_path;
    return await this.resumeRepository.save(resume);
  }

  async createResumeVersion(dto: CreateResumeVersionDto) {
    const resume = await this.resumeRepository.findOne({
      where: { id: dto.resume_id },
    });
    if (!resume) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    const newVersion = this.resumeVersionRepository.create({
      resume,
      file_path: dto.file_path,
      version_type: dto.version_type,
    });
    return await this.resumeRepository.save(newVersion);
  }

  async getResumeWithVersions(resume_id: string) {
    return await this.resumeRepository.findOne({
      where: { id: resume_id },
      relations: ['resumeVersions'],
    });
  }

  async revertToVersion(resume_id: string, version_id: string) {
    const resume = await this.resumeRepository.findOne({
      where: { id: resume_id },
    });
    const version = await this.resumeVersionRepository.findOne({
      where: { id: version_id, resume: { id: resume_id } },
    });

    if (!resume || !version) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }

    console.log(`Reverting resume ${resume_id} to version ${version_id}`);

    await this.resumeVersionRepository.save({
      resume,
      file_path: resume.file_path,
      version_type: 'AUTO_BACKUP',
    });

    const oldFilePath = resume.file_path;

    resume.file_path = version.file_path;
    const updatedResume = await this.resumeRepository.save(resume);

    if (oldFilePath) {
      const fullPath = path.join(__dirname, '..', '..', 'uploads', oldFilePath);
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(`Error: ${fullPath}`, err);
        } else {
          console.log(`Deleted: ${fullPath}`);
        }
      });
    }

    return updatedResume;
  }
}
