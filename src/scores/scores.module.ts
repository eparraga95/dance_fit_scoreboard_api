import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Player } from 'src/players/entities/player.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Event } from 'src/events/entities/event.entity';
import { Music } from 'src/musics/entities/music.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Phase } from 'src/phases/entities/phase.entity';
import { S3Service } from 'src/aws/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score, Player, Event, Music, Category, Phase]),
    AuthModule,
    JwtModule,
  ],
  controllers: [ScoresController],
  providers: [ScoresService, S3Service],
})
export class ScoresModule {}
