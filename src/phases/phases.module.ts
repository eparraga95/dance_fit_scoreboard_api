import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { PhasesController } from './phases.controller';
import { Category } from 'src/categories/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phase } from './entities/phase.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Music } from 'src/musics/entities/music.entity';
import { Score } from 'src/scores/entities/score.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Phase, Category, Music, Score]), JwtModule, AuthModule],
  controllers: [PhasesController],
  providers: [PhasesService],
})
export class PhasesModule {}
