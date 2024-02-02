import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Repository } from 'typeorm';
import { loginParams } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
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
      return await this.generateToken(player);
    }

    throw new UnauthorizedException('Player not found. Cannot login');
  }

  async generateToken(payload: Player) {
    return {
      access_token: this.jwtService.sign(
        {
          nickname: payload.nickname,
          player_id: payload.player_id,
          role: payload.role,
        },
        {
          secret: process.env.jwtSecret,
          expiresIn: '1h',
        },
      ),
    };
  }
}
