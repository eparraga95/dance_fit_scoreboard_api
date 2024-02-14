import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { Music } from 'src/musics/entities/music.entity';
import { Score } from 'src/scores/entities/score.entity';
import { Event } from 'src/events/entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Session } from 'src/auth/entities/session.entity';
import { JwtModule } from '@nestjs/jwt';
import { Player } from 'src/players/entities/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Music, Score, Event, Session, Player]),
    JwtModule,
    AuthModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
