import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { JwtModule } from '@nestjs/jwt';
import { S3Service } from 'src/aws/s3.service';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([Player])],
  controllers: [PlayersController],
  providers: [PlayersService, S3Service],
})
export class PlayersModule {}
