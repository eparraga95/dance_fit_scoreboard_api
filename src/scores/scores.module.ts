import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Player } from 'src/players/entities/player.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Event } from 'src/events/entities/event.entity';
import { Session } from 'src/auth/entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score, Player, Event, Session]), AuthModule, JwtModule],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
