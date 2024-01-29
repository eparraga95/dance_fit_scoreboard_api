import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { ScoresModule } from './scores/scores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './players/entities/player.entity';
import { Score } from './scores/entities/score.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'parraga',
    password: '@MySQLServer123',
    database: 'dance_fit_scoreboard_db',
    entities: [Player, Score],
    synchronize: true,
  }),PlayersModule, ScoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
