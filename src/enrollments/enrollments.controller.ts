import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { create } from 'domain';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
      return this.enrollmentsService.create(createEnrollmentDto)
    }

    @UseGuards(AdminGuard, AuthGuard)
    @Get()
    findAll() {
      return this.enrollmentsService.findAll()
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.enrollmentsService.remove(+id)
    }

  }
