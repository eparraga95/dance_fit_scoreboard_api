import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { AddMusicDto } from './dto/add-music.dto';
import { RemoveMusicDto } from './dto/remove-music.dto';

@Controller('phases')
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}


  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  create(@Body() createPhaseDto: CreatePhaseDto) {
    return this.phasesService.create(createPhaseDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.phasesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phasesService.findOne(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhaseDto: UpdatePhaseDto) {
    return this.phasesService.update(+id, updatePhaseDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phasesService.remove(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch('/:id/add_music')
  addMusic(@Body() addMusicDto: AddMusicDto, @Param('id') phase_id: number) {
    return this.phasesService.addMusic(phase_id, addMusicDto)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch('/:id/remove_music')
  removeMusic(@Body() removeMusicDto: RemoveMusicDto, @Param('id') phase_id: number) {
    return this.phasesService.removeMusic(phase_id, removeMusicDto)
  }

}
