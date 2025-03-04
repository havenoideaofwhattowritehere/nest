import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/createResume.dto';
import { UpdateResumeDto } from './dto/updateResume.dto';
import { CreateResumeVersionDto } from 'src/modules/resume_version/dto/createResumeVersion.dto';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  async createResume(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.createResume(createResumeDto);
  }

  @Patch(':resumeId')
  async updateResume(
    @Param('resumeId') resumeId: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return this.resumeService.updateResume(resumeId, updateResumeDto);
  }

  @Post('versions')
  async createResumeVersion(
    @Body() createResumeVersionDto: CreateResumeVersionDto,
  ) {
    return this.resumeService.createResumeVersion(createResumeVersionDto);
  }

  @Get(':resumeId')
  async getResumeWithVersions(@Param('resumeId') resumeId: string) {
    return this.resumeService.getResumeWithVersions(resumeId);
  }

  @Patch(':resumeId/revert/:versionId')
  async revertToVersion(
    @Param('resumeId') resumeId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.resumeService.revertToVersion(resumeId, versionId);
  }
}
