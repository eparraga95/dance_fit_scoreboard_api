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
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    @Inject(REQUEST) private request,
    private jwtService: JwtService,
  ) {}

  async validatePlayer(loginDetails: loginParams) {
    try {
      const { nickname, password } = loginDetails;

      const player = await this.playerRepository.findOne({
        where: {
          nickname: nickname,
        },
        relations: {
          session: true,
        },
      });

      if (!player)
        throw new NotFoundException('Player nickname/password incorrect');

      const passwordMatch = await bcrypt.compare(password, player.password)

      if (passwordMatch) {
        return await this.createSession(player)
      }

      throw new UnauthorizedException('Player nickname/password incorrect');
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async createSession(player: Player) {

    try {

      
      if (player.session) {
        const { token } = player.session
        await this.sessionRepository.delete({ token: token })
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
            expiresIn: '3h',
          },
        ),
        player: player,
      };

      const newSession = this.sessionRepository.create(newSessionData);

      await this.sessionRepository.save(newSession);

      return {
        access_token: newSessionData.token,
      };
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  async removeSession() {
    const token = this.request.headers.authorization.split(' ')[1];

    await this.sessionRepository.delete({ token: token });

    return {
      message: 'Logged out succesfully',
    };
  }

  async hashPasswordsForAllPlayers() {
    try {
      const players = await this.playerRepository.find();
      
      for (const player of players) {
        const hashedPassword = await bcrypt.hash(player.password, 10); // Hash the password
        player.password = hashedPassword; // Update the player's password
      }

      await this.playerRepository.save(players); // Save all players with hashed passwords
    } catch (error) {
      console.error('Error hashing passwords:', error);
      throw error;
    }
  }
}
