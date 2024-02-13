import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Category } from 'src/categories/entities/category.entity';
import { Score } from 'src/scores/entities/score.entity';
import { Music } from './entities/music.entity';
import { JwtModule } from '@nestjs/jwt';
import { Session } from 'src/auth/entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Score, Music, Session]),
    JwtModule,
    AuthModule,
  ],
  controllers: [MusicsController],
  providers: [MusicsService],
})
export class MusicsModule {}
