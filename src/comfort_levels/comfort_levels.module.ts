import { Module } from '@nestjs/common';
import { ComfortLevelsService } from './comfort_levels.service';
import { ComfortLevelsController } from './comfort_levels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComfortLevel } from './entities/comfort_level.entity';
import { Player } from 'src/players/entities/player.entity';
import { Event } from 'src/events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComfortLevel, Player, Event])],
  controllers: [ComfortLevelsController],
  providers: [ComfortLevelsService],
})
export class ComfortLevelsModule {}
