import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Repository } from 'typeorm';
import { loginParams } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { Session } from './entities/session.entity';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    @Inject(REQUEST) private request,
    private jwtService: JwtService,
  ) {}

  async validatePlayer(loginDetails: loginParams) {
    const { nickname, password } = loginDetails;

    const player = await this.playerRepository.findOneBy({
      nickname: nickname,
    });

    if (!player)
      throw new HttpException(
        'Player not found. Cannot login',
        HttpStatus.NOT_FOUND,
      );

    if (player.password === password) {
      return await this.createSession(player);
    }

    throw new UnauthorizedException('Player not found. Cannot login');
  }

  async createSession(player: Player) {
    const existingSession = await this.sessionRepository.findOneBy({
      player: player,
    });

    if (existingSession) {
      await this.sessionRepository.delete(existingSession);
    }

    const newSessionData = {
      token: this.jwtService.sign(
        {
          nickname: player.nickname,
          player_id: player.player_id,
          role: player.role,
        },
        {
          secret: process.env.jwtSecret,
          expiresIn: '1h',
        },
      ),
      player: player,
    };

    const newSession = this.sessionRepository.create(newSessionData);

    this.sessionRepository.save(newSession);

    return {
      access_token: newSessionData.token,
    };
  }

  async removeSession() {
    const token = this.request.headers.authorization.split(' ')[1];

    const session = await this.sessionRepository.findOneBy({ token: token });

    await this.sessionRepository.delete(session);

    return {
      message: 'Logged out succesfully',
    };
  }
}
