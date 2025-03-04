import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TechnologyService } from './technologies.service';
import { CreateTechnologyDto } from './dto/createTechnologyDto';
import { UpdateTechnologyDto } from './dto/updateTechnologyDto';
import { Technology } from './entities/technologies.entity';

@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post()
  async createTechnology(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.technologyService.createTechnology(createTechnologyDto);
  }

  @Get()
  async getAllTechnologies(): Promise<Technology[]> {
    return this.technologyService.getTechnologies();
  }

  @Get(':id')
  async getTechnologyById(@Param('id') id: string) {
    return this.technologyService.getTechnologyById(id);
  }

  @Put(':id')
  async updateTechnology(
    @Param('id') id: string,
    @Body() updateTechnologyDto: UpdateTechnologyDto,
  ) {
    return this.technologyService.updateTechnology(id, updateTechnologyDto);
  }

  @Delete(':id')
  async deleteTechnology(@Param('id') id: string) {
    return this.technologyService.deleteTechnology(id);
  }
}
