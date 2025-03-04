import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ResumeVersionService } from './resume_version.service';

@Controller('resumeVersion')
export class ResumeVersionController {
  constructor(private readonly resumeVersionService: ResumeVersionService) {}

  @Get(':resumeId')
  async getResumeVersions(@Param('resumeId') resumeId: string) {
    return this.resumeVersionService.getResumeVersions(resumeId);
  }

  @Delete(':versionId')
  async deleteVersion(@Param('versionId') versionId: string) {
    return this.resumeVersionService.deleteVersion(versionId);
  }
}
