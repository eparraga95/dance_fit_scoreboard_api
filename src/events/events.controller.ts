import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { AdminAddPlayerDto } from './dto/adm-add-player.dto';
import { AdminRemovePlayerDto } from './dto/adm-remove-player.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @UseGuards(AdminGuard, AuthGuard)
  @Patch(':id/admin/add_player')
  adminAddPlayer(
    @Body() admAddPlayerDto: AdminAddPlayerDto,
    @Param('id') event_id: number,
  ) {
    return this.eventsService.adminAddPlayer(admAddPlayerDto, event_id);
  }

  @UseGuards(AdminGuard, AuthGuard)
  @Patch(':id/admin/remove_player')
  adminRemovePlayer(
    @Body() admRemovePlayerDto: AdminRemovePlayerDto,
    @Param('id') event_id: number,
  ) {
    return this.eventsService.adminRemovePlayer(admRemovePlayerDto, event_id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/join')
  addPlayer(@Req() { user }, @Param('id') event_id: number) {
    const { player_id } = user;

    return this.eventsService.addPlayer(player_id, event_id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/leave')
  removePlayer(@Req() { user }, @Param('id') event_id: number) {
    const { player_id } = user;

    return this.eventsService.removePlayer(player_id, event_id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
