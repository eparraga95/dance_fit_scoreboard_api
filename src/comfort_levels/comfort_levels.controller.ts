import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ComfortLevelsService } from './comfort_levels.service';
import { CreateComfortLevelDto } from './dto/create-comfort_level.dto';
import { UpdateComfortLevelDto } from './dto/update-comfort_level.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { get } from 'http';
import { Request } from 'express';

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

  @UseGuards(AuthGuard)
  @Get('events/:event_id')
  findOneByEventPlayer(@Param('event_id') event_id: string, @Req() request: Request ) {
    const { player_id } = request.player
    return this.comfortLevelsService.findOneByEventPlayer(Number(event_id), Number(player_id))
  }
}
