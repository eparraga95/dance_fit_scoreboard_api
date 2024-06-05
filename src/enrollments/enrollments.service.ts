import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEnrollmentParams } from './dto/create-enrollment.dto';
import { Player } from 'src/players/entities/player.entity';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class EnrollmentsService {
    constructor(
        @InjectRepository(Enrollment) private enrollmentRepository: Repository<Enrollment>,
        @InjectRepository(Player) private playerRepository: Repository<Player>,
        @InjectRepository(Event) private eventRepository: Repository<Event>
    ) {}

    async create(createEnrollmentDetails: CreateEnrollmentParams) {
        try {
            const { player_id, event_id } = createEnrollmentDetails

            const player = await this.playerRepository.findOne({
                where: {
                    player_id: player_id
                }
            })

            if (!player) {
                throw new NotFoundException("Player not found")
            }

            const event = await this.eventRepository.findOne({
                where: {
                    event_id: event_id
                },
                relations: {
                    players: true
                }
            })

            if (!event) {
                throw new NotFoundException("Event not found")
            }

            const isPlayerAlreadyParticipant = event.players.some(
                participant => participant.player_id == player_id
            )

            if (isPlayerAlreadyParticipant) {
                throw new BadRequestException("Player is already a participant in this event")
            }

            const existingEnrollment = await this.enrollmentRepository.findOne({
                where: {
                    player: player,
                    event: event
                }
            })

            if (existingEnrollment) {
                throw new BadRequestException("There is already an enrollment for this player in this event")
            }

            const newEnrollment = this.enrollmentRepository.create({
                player: player,
                event: event
            })

            await this.enrollmentRepository.save(newEnrollment)
        } catch (error) {
            console.error('Error creating enrollment', error)
            throw error
        }
    }

    async findAll() {
        return await this.enrollmentRepository.find({
            relations: {
                event: true,
                player: true
            }
        })
    }

    async remove(id: number) {
        try {
            const enrollment = await this.enrollmentRepository.findOne({
                where: {
                    enrollment_id: id
                }
            })

            if (!enrollment) {
                throw new NotFoundException('Enrollment not found')
            }

            const deletionResult = await this.enrollmentRepository.delete({
                enrollment_id: id,
            })

            if (deletionResult.affected === 0) {
                throw new InternalServerErrorException('Failed to delete enrollment')
            }

            return { message: 'Enrollment deleted successfully'}
        } catch (error) {
            console.error('Error deleting an enrollment', error)
            throw error;
        }
    }

}
