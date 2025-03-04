import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DirectionService } from './direction.service';
import { CreateDirectionDto } from './dto/create-direction';
import { UpdateDirectionDto } from './dto/update-direction';

@Controller('directions')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createDirection(@Body() createDirectionDto: CreateDirectionDto) {
    return this.directionService.createDirection(createDirectionDto);
  }

  @Get()
  async getDirections() {
    return this.directionService.getAllDirections();
  }

  @Put(':id')
  async updateDirection(
    @Param('id') id: string,
    @Body() updateDirectionDto: UpdateDirectionDto,
  ) {
    return this.directionService.updateDirection(id, updateDirectionDto);
  }

  @Delete('id')
  @HttpCode(HttpStatus.OK)
  async removeDirection(@Param('id') id: string) {
    return this.directionService.removeDirectionById(id);
  }
}
