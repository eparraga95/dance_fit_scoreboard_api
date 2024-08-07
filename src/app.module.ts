import { INestApplication, Module } from '@nestjs/common';
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
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { EventTypesModule } from './event_types/event_types.module';
import { ComfortLevelsModule } from './comfort_levels/comfort_levels.module';
import { SongListsModule } from './song_lists/song_lists.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';

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
    EventTypesModule,
    ComfortLevelsModule,
    SongListsModule,
    EnrollmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static configureSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
      .setTitle('Dance Fit Scoreboard API')
      .setDescription(
        'Back-end solution for the scoreboard that will store, process and mantain the data Dance Fit official events.',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}
