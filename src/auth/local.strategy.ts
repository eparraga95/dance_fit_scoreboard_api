import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'nickname',
    });
  }

  async validate(nickname: string, password: string): Promise<any> {
    const player = await this.authService.validatePlayer(nickname, password);

    if (!player) {
      throw new UnauthorizedException('Player not found');
    }

    return player;
  }
}
