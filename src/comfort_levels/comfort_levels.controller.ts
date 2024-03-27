import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComfortLevelsService } from './comfort_levels.service';
import { CreateComfortLevelDto } from './dto/create-comfort_level.dto';
import { UpdateComfortLevelDto } from './dto/update-comfort_level.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('comfort-levels')
export class ComfortLevelsController {
  constructor(private readonly comfortLevelsService: ComfortLevelsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createComfortLevelDto: CreateComfortLevelDto) {
    return this.comfortLevelsService.create(createComfortLevelDto);
  }

  @Get()
  findAll() {
    return this.comfortLevelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comfortLevelsService.findOne(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComfortLevelDto: UpdateComfortLevelDto) {
    return this.comfortLevelsService.update(+id, updateComfortLevelDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfortLevelsService.remove(+id);
  }
}
