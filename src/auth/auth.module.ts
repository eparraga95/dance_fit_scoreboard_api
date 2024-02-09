import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.auth';
import { PlayersService } from 'src/players/players.service';
import { ConfigModule } from '@nestjs/config';
import { Session } from './entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Session]),
    PassportModule,
    JwtModule,
    ConfigModule
  ],
  providers: [AuthService, LocalStrategy, PlayersService],
  controllers: [AuthController]
})
export class AuthModule {}
