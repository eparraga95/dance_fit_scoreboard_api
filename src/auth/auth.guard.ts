import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestToken: string = request.headers.authorization.split(' ')[1];

    if (!requestToken) {
      throw new UnauthorizedException('No Token Found');
    }

    const session = await this.sessionRepository.findOne({
      where: { token: requestToken },
    });

    if (!session) {
      throw new UnauthorizedException('Invalid token');
    }

    const now = new Date();

    const decodedJwt = this.jwtService.decode(session.token);

    const jwtExpiration = new Date(decodedJwt.exp * 1000);

    if (now > jwtExpiration) {
      throw new UnauthorizedException('Session expired');
    }

    request.user = this.jwtService.verify(session.token, {
      secret: process.env.jwtSecret,
    });

    return true;
  }
}
