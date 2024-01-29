import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Player } from 'src/players/entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score, Player])],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
