import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PlayersService } from 'src/players/players.service';
import { Session } from './entities/session.entity';
import { S3Service } from 'src/aws/s3.service';
require('dotenv').config()

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Session]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.jwtSecret,
      signOptions: {
        expiresIn: '3h'
      }
    }),
  ],
  providers: [AuthService, PlayersService, S3Service],
  controllers: [AuthController],
})
export class AuthModule {}
