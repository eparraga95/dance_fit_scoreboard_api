import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Player } from 'src/players/entities/player.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EventType } from 'src/event_type/entities/event_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Player, EventType]), AuthModule, JwtModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
