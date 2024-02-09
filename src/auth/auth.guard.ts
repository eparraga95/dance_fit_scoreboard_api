import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const requestToken: string = request.headers.authorization.split(' ')[1];

      if (!requestToken) {
        throw new UnauthorizedException();
      }

      const session = await this.sessionRepository.findOne({
        where: { token: requestToken },
      });

      if (requestToken !== session.token) {
        throw new UnauthorizedException();
      }

      request.user = this.jwtService.verify(session.token, {
        secret: process.env.jwtSecret,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }

    return true;
  }
}
