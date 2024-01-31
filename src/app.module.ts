import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { ScoresModule } from './scores/scores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './players/entities/player.entity';
import { Score } from './scores/entities/score.entity';
import { EventsModule } from './events/events.module';
import { Event } from './events/entities/event.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.postgresURL,
      entities: [Player, Score, Event],
      synchronize: false,
      autoLoadEntities: true,
    }),
    PlayersModule,
    ScoresModule,
    EventsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
