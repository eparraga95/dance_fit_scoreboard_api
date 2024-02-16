import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { ScoresModule } from './scores/scores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from 'db/data-source';
import { MusicsModule } from './musics/musics.module';
import { CategoriesModule } from './categories/categories.module';
import { PhasesModule } from './phases/phases.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    PlayersModule,
    ScoresModule,
    EventsModule,
    AuthModule,
    MusicsModule,
    CategoriesModule,
    PhasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
