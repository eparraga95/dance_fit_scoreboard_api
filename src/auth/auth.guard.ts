import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException();
      }

      request.user = this.jwtService.verify(token, {
        secret: process.env.jwtSecret,
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }

    return true;
  }
}
