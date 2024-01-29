import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [PlayersModule, ScoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
