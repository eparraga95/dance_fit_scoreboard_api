import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phase.dto';
import { UpdatePhaseDto } from './dto/update-phase.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

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
}
