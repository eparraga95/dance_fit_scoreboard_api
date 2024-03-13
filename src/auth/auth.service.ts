import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Repository } from 'typeorm';
import { loginParams } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDetails: loginParams) {

    const { nickname, password } = loginDetails;

    const player = await this.playerRepository.findOne({
      where: {
        nickname: nickname,
      },
    });

    if (!player)
      throw new NotFoundException('Player nickname/password incorrect');

    const passwordMatch = await bcrypt.compare(password, player.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Player nickname/password incorrect');
    }

    const payload = {
      nickname: player.nickname,
      player_id: player.player_id,
      role: player.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
