import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { JwtModule } from '@nestjs/jwt';
import { Session } from 'src/auth/entities/session.entity';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Player, Session])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
