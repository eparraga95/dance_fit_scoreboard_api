import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { JwtModule } from '@nestjs/jwt';
import { Session } from 'src/auth/entities/session.entity';
import { S3Service } from 'src/aws/s3.service';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Player, Session])],
  controllers: [PlayersController],
  providers: [PlayersService, S3Service],
})
export class PlayersModule {}
