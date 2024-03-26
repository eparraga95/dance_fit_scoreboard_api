import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventTypeParams } from './dto/create-event_type.dto';
import { UpdateEventTypeParams } from './dto/update-event_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType } from './entities/event_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectRepository(EventType)
    private eventTypeRepository: Repository<EventType>,
  ) {}

  async create(createEventTypeDetails: CreateEventTypeParams) {
    try {
      const { name } = createEventTypeDetails;

      if (!name) {
        throw new BadRequestException('Invalid event type details');
      }

      const sameNameEventType = await this.eventTypeRepository.findOne({
        where: { name },
      });

      if (sameNameEventType) {
        throw new BadRequestException(
          'An event type with the same name already exists',
        );
      }

      const newEventType = this.eventTypeRepository.create(
        createEventTypeDetails,
      );

      return await this.eventTypeRepository.save(newEventType);
    } catch (error) {
      console.error('Error creating event type:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.eventTypeRepository.find({
      relations: {
        events: true,
      },
    });
  }

  async findOne(id: number) {
    const eventType = await this.eventTypeRepository.findOne({
      where: { event_type_id: id },
      relations: {
        events: true,
      },
    });

    if (!eventType) {
      throw new NotFoundException('Event type not found');
    }

    return eventType;
  }

  async update(id: number, updateEventTypeDetails: UpdateEventTypeParams) {
    try {
      const eventType = await this.eventTypeRepository.findOne({
        where: { event_type_id: id },
      });

      if (!eventType) {
        throw new NotFoundException('Event type not found');
      }

      const updateResult = await this.eventTypeRepository.update(
        {
          event_type_id: id,
        },
        {
          ...updateEventTypeDetails,
        },
      );

      if (updateResult.affected === 0) {
        throw new InternalServerErrorException('Failed to update event type');
      }

      return await this.eventTypeRepository.findOne({
        where: {
          event_type_id: id,
        },
      });
    } catch (error) {
      console.error('Error updating event type:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {

      const eventType = await this.eventTypeRepository.findOne({
        where: {event_type_id: id},
      })

      if (!eventType) {
        throw new NotFoundException('Event type not found')
      }

      const deletionResult = await this.eventTypeRepository.delete({
        event_type_id: id
      })

      if (deletionResult.affected === 0) {
        throw new InternalServerErrorException('Failed to delete event type')
      }

      return {message: 'Event type deleted successfully'}


    } catch (error) {
      console.error('Error deleting event type:', error)
      throw error
    }

  }
}
