import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const requestToken: string = request.headers.authorization.split(' ')[1];

    const decodedRequestUser = this.jwtService.decode(requestToken);

    if (decodedRequestUser.role !== 'admin') {
      throw new ForbiddenException();
    } else {
      return true;
    }
  }
}
