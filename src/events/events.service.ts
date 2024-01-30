import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventParams } from './dto/create-event.dto';
import { UpdateEventDto, UpdateEventParams } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { AddPlayerParams } from './dto/add-player.dto';
import { Player } from 'src/players/entities/player.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  create(createEventDetails: CreateEventParams) {
    const newEvent = this.eventRepository.create({ ...createEventDetails });
    return this.eventRepository.save(newEvent);
  }

  async addPlayer(
    nickname: string,
    event_id: number,
  ) {
    const player = await this.playerRepository.findOneBy({
      nickname: nickname
    });

    if (!player)
      throw new HttpException('Player not found.', HttpStatus.NOT_FOUND);

    const event = await this.eventRepository.findOneBy({ event_id: event_id });

    if (!event)
      throw new HttpException('Event not found.', HttpStatus.NOT_FOUND);

    if (event.players.filter(pl => pl.nickname === player.nickname)) {
      throw new BadRequestException("Player already in event")
    }
    
    event.players = [ ...event.players, player]

    return await this.eventRepository.save(event)
  }

  findAll() {
    return this.eventRepository.find();
  }

  findOne(id: number) {
    return this.eventRepository.findOneBy({ event_id: id });
  }

  update(id: number, updateEventDetails: UpdateEventParams) {
    return this.eventRepository.update(
      { event_id: id },
      { ...updateEventDetails },
    );
  }

  remove(id: number) {
    return this.eventRepository.delete({ event_id: id });
  }
}
