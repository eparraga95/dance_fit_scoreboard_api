import { JwtService } from '@nestjs/jwt';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Repository } from 'typeorm';
import { loginParams } from './dto/login.dto';
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
      throw new NotFoundException('Player nickname/password incorrect');

    if (player.password === password) {
      return await this.createSession(player);
    }

    throw new UnauthorizedException('Player nickname/password incorrect');
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

    await this.sessionRepository.delete({ token: token });

    return {
      message: 'Logged out succesfully',
    };
  }
}
